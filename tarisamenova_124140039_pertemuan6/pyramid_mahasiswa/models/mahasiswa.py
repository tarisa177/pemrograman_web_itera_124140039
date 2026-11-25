
from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column

from .meta import Base


class Mahasiswa(Base):
    __tablename__ = 'mahasiswa'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nim: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    nama: Mapped[str] = mapped_column(Text, nullable=False)
    jurusan: Mapped[str] = mapped_column(Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'nim': self.nim,
            'nama': self.nama,
            'jurusan': self.jurusan,
        }
