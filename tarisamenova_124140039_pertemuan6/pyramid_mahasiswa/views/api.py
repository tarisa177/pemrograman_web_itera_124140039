
import sqlalchemy as sa
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
    HTTPConflict,
)

from .. import models


def validate_matakuliah(data):
    for field in ('sks', 'semester'):
        if field in data:
            value = data[field]

            if (
                isinstance(value, bool)
                or not isinstance(value, int)
                or value <= 0
            ):
                raise HTTPBadRequest(
                    json_body={
                        'error': f'{field} harus berupa bilangan bulat positif'
                    }
                )


def collection(request, model, fields):
    if request.method == 'GET':
        query = sa.select(model).order_by(model.id)
        items = request.dbsession.execute(query).scalars().all()
        return [item.to_dict() for item in items]

    try:
        data = request.json_body
    except Exception:
        raise HTTPBadRequest(
            json_body={'error': 'JSON tidak valid'}
        )

    if not isinstance(data, dict):
        raise HTTPBadRequest(
            json_body={'error': 'Data harus berupa objek JSON'}
        )

    values = {key: data[key] for key in fields if key in data}

    if any(key not in values for key in fields):
        raise HTTPBadRequest(
            json_body={'error': 'Field wajib belum lengkap'}
        )

    if model is models.Matakuliah:
        validate_matakuliah(values)

    item = model(**values)
    request.dbsession.add(item)

    try:
        request.dbsession.flush()
    except sa.exc.IntegrityError:
        raise HTTPConflict(
            json_body={'error': 'Data sudah digunakan'}
        )

    return item.to_dict()


def detail(request, model, fields):
    item = request.dbsession.get(
        model, int(request.matchdict['id'])
    )

    if item is None:
        raise HTTPNotFound(
            json_body={'error': 'Data tidak ditemukan'}
        )

    if request.method == 'GET':
        return item.to_dict()

    if request.method == 'PUT':
        try:
            data = request.json_body
        except Exception:
            raise HTTPBadRequest(
                json_body={'error': 'JSON tidak valid'}
            )

        if not isinstance(data, dict):
            raise HTTPBadRequest(
                json_body={'error': 'Data harus berupa objek JSON'}
            )

        if model is models.Matakuliah:
            validate_matakuliah(data)

        for key in fields:
            if key in data:
                setattr(item, key, data[key])

        try:
            request.dbsession.flush()
        except sa.exc.IntegrityError:
            raise HTTPConflict(
                json_body={'error': 'Data sudah digunakan'}
            )

        return item.to_dict()

    request.dbsession.delete(item)
    return {'message': 'Data berhasil dihapus'}


@view_config(route_name='mahasiswa_list', request_method='GET', renderer='json')
@view_config(route_name='mahasiswa_list', request_method='POST', renderer='json')
def mahasiswa_list(request):
    return collection(
        request, models.Mahasiswa, ['nim', 'nama', 'jurusan']
    )


@view_config(route_name='mahasiswa_detail', request_method='GET', renderer='json')
@view_config(route_name='mahasiswa_detail', request_method='PUT', renderer='json')
@view_config(route_name='mahasiswa_detail', request_method='DELETE', renderer='json')
def mahasiswa_detail(request):
    return detail(
        request, models.Mahasiswa, ['nim', 'nama', 'jurusan']
    )


@view_config(route_name='matakuliah_list', request_method='GET', renderer='json')
@view_config(route_name='matakuliah_list', request_method='POST', renderer='json')
def matakuliah_list(request):
    return collection(
        request,
        models.Matakuliah,
        ['kode_mk', 'nama_mk', 'sks', 'semester']
    )


@view_config(route_name='matakuliah_detail', request_method='GET', renderer='json')
@view_config(route_name='matakuliah_detail', request_method='PUT', renderer='json')
@view_config(route_name='matakuliah_detail', request_method='DELETE', renderer='json')
def matakuliah_detail(request):
    return detail(
        request,
        models.Matakuliah,
        ['kode_mk', 'nama_mk', 'sks', 'semester']
    )
