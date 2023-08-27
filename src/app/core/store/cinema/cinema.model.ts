export interface Response<T> {
  statusCode: number;
  message: string;
  content: T;
  dateTime: Date;
  messageConstants: null;
}

export interface ThongTinLichChieuPhimModel {
  heThongRapChieu: HeThongRapChieu[];
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: Date;
  danhGia: number;
}

export interface HeThongRapChieu {
  cumRapChieu: CumRapChieu[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}

export interface CumRapChieu {
  lichChieuPhim: LichChieuPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

export interface LichChieuPhim {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  thoiLuong: number;
}

export interface ThongTinLichChieuHeThongRapModel {
  lstCumRap: LstCumRap[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
}

export interface LstCumRap {
  danhSachPhim: DanhSachPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

export interface DanhSachPhim {
  lstLichChieuTheoPhim: LstLichChieuTheoPhim[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean | null;
  dangChieu: boolean | null;
  sapChieu: boolean | null;
}

export interface LstLichChieuTheoPhim {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
}

export interface ThongTinCumRapTheoHeThongModel {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: DanhSachRap[];
}

export interface DanhSachRap {
  maRap: number;
  tenRap: string;
}
