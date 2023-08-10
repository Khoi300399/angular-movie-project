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
export interface AuthRes {
  statusCode: number;
  message: string;
  content: Auth;
  dateTime: Date;
  messageConstants: null;
}
