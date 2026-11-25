
from pyramid.view import view_config
from pyramid.response import Response
import sqlalchemy as sa

from .. import models


@view_config(route_name='home', renderer='pyramid_mahasiswa:templates/mytemplate.jinja2')
def my_view(request):
    try:
        query = sa.select(models.Matakuliah).order_by(
            models.Matakuliah.semester
        )
        matakuliah = request.dbsession.execute(query).scalars().all()

    except sa.exc.SQLAlchemyError:
        return Response(
            db_err_msg,
            content_type='text/plain',
            status=500
        )

    return {
        'matakuliah': matakuliah,
        'project': 'Pyramid Mahasiswa'
    }


db_err_msg = """\
Pyramid mengalami masalah saat menggunakan database.
Periksa konfigurasi database dan pastikan server PostgreSQL berjalan.
"""
