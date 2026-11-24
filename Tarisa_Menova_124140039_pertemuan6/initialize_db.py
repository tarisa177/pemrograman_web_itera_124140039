
import argparse
import sys

from pyramid.paster import bootstrap, setup_logging



def setup_models(dbsession):
    from pyramid_mahasiswa.models import Matakuliah

    data_matakuliah = [
        Matakuliah(
            kode_mk='IF101',
            nama_mk='Algoritma dan Pemrograman',
            sks=3,
            semester=1,
        ),
        Matakuliah(
            kode_mk='IF102',
            nama_mk='Struktur Data',
            sks=3,
            semester=2,
        ),
        Matakuliah(
            kode_mk='IF103',
            nama_mk='Basis Data',
            sks=3,
            semester=3,
        ),
    ]

    for matakuliah in data_matakuliah:
        existing = dbsession.query(Matakuliah).filter_by(
            kode_mk=matakuliah.kode_mk
        ).first()

        if existing is None:
            dbsession.add(matakuliah)



def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    finally:
        env['closer']()


if __name__ == '__main__':
    main()
