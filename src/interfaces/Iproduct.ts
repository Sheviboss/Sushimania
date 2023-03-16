export interface iProduct {
  id: number;
  id1?: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  composition: string[];
  category: string[];
  portions?: any;
  dough?: any;
  type?: number;
  menyType?: string;
  diameter?: string;
  dobavki?: any;
  openPopup?: () => void;
  addtoCart?: () => void;
  changeSostav?: () => void;
  count: number;
  weight: number;
  removeFromCart?: () => void;
  TotalCategoryPrice?: number;
  removeTovar?: () => void;
  registr?: () => void;
}
