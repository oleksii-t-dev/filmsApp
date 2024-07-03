export interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  setInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormProps {
  isVisible: boolean;
  onClose?: () => void;
}

export interface Credentials {
  email: string;
  password: string;
}
