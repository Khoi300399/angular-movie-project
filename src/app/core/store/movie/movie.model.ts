export interface BannerModel {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
  trailer: string;
}
export interface BannerRes {
  statusCode: number;
  message: string;
  content: BannerModel[];
  dateTime: Date;
  messageConstants: null;
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
export interface MoviesRes {
  statusCode: number;
  message: string;
  content: MoviesModel[];
  dateTime: Date;
  messageConstants: null;
}

export interface MoviesPginationRes {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: MoviesModel[];
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
export interface MovieByIdRes {
  statusCode: number;
  message: string;
  content: MovieByIdModel;
  dateTime: Date;
  messageConstants: null;
}
