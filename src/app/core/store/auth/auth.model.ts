export interface Credentials {
  taiKhoan: string;
  matKhau: string;
}
export interface AuthRes {
  statusCode: number;
  message: string;
  content: Auth;
  dateTime: Date;
  messageConstants: null;
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
