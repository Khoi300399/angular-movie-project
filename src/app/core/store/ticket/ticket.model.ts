export interface Response<T> {
  statusCode: number;
  message: string;
  content: T;
  dateTime: Date;
  messageConstants: null;
}

export interface DanhSachPhongVeModel {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
}

export interface DanhSachGhe {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: LoaiGhe;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: string | null;
}

export enum LoaiGhe {
  Thuong = 'Thuong',
  Vip = 'Vip',
}

export interface ThongTinPhim {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
}
export interface DatVeModel {
  maLichChieu: number;
  danhSachVe: DanhSachVe[];
}

export interface DanhSachVe {
  maGhe: number;
  giaVe: number;
}
