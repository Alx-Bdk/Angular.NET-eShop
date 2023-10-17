import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../shared/models/pagination';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl : string = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProducts(shopParamas: ShopParams): Observable<Pagination<Product[]>> {
    let params = new HttpParams();

    if (shopParamas.brandId > 0) params = params.append('brandId', shopParamas.brandId);
    if (shopParamas.typeId > 0) params = params.append('typeId', shopParamas.typeId);
    params = params.append('sort', shopParamas.sort);
    params = params.append('pageIndex', shopParamas.pageNumber);
    params = params.append('pageSize', shopParamas.pageSize);
    if (shopParamas.search) params = params.append('search', shopParamas.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params});
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}
