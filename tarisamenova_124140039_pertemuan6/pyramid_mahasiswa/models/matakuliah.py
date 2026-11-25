
from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column

from .meta import Base


class Matakuliah(Base):
    __tablename__ = 'matakuliah'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    kode_mk: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    nama_mk: Mapped[str] = mapped_column(Text, nullable=False)
    sks: Mapped[int] = mapped_column(nullable=False)
    semester: Mapped[int] = mapped_column(nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester,
        }
