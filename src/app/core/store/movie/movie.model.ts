export interface Response<T> {
  statusCode: number;
  message: string;
  content: T;
  dateTime: Date;
  messageConstants: null;
}

export interface BannerModel {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
  trailer: string;
}

export interface MoviesModel {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface MovieByIdModel {
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
