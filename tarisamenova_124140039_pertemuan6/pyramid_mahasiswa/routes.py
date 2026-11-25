
def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)

    config.add_route('home', '/')

    config.add_route('mahasiswa_list', '/api/mahasiswa')
    config.add_route('mahasiswa_detail', '/api/mahasiswa/{id}')

    config.add_route('matakuliah_list', '/api/matakuliah')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}')
