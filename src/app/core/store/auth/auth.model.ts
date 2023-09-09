export interface Credentials {
  taiKhoan: string;
  matKhau: string;
}

export interface RegisterModel {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  hoTen: string;
}

export interface Auth {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  accessToken: string;
}
export interface Response<T> {
  statusCode: number;
  message: string;
  content: T;
  dateTime: Date;
  messageConstants: null;
}

export interface ThongTinTaiKhoanModel {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  loaiNguoiDung: LoaiNguoiDung;
  thongTinDatVe: ThongTinDatVe[];
}

export interface LoaiNguoiDung {
  maLoaiNguoiDung: string;
  tenLoai: string;
}

export interface ThongTinDatVe {
  danhSachGhe: DanhSachGhe[];
  maVe: number;
  ngayDat: Date;
  tenPhim: string;
  hinhAnh: string;
  giaVe: number;
  thoiLuongPhim: number;
}

export interface DanhSachGhe {
  maHeThongRap: string;
  tenHeThongRap: string;
  maCumRap: string;
  tenCumRap: string;
  maRap: number;
  tenRap: string;
  maGhe: number;
  tenGhe: string;
}
