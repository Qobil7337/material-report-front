import {Component, OnInit} from '@angular/core';
import {Nomenclature} from "../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";

export interface GoodsInwards {
  id: number
  date: Date
  supplier: string
  warehouse: string
  goodsInwardsItems: [
    {
      nomenclatureID: number,
      nomenclatureName: string,
      unit: Unit,
      quantity: number,
      price: number,
      sum: number
    }
  ]
  totalSum: number
}
export enum Unit {
  kg = "kg",
  pc = "piece",
  litre = "litre"
}
@Component({
  selector: 'app-goods-inward',
  templateUrl: './goods-inward.component.html',
  styleUrls: ['./goods-inward.component.css']
})
export class GoodsInwardComponent  implements OnInit {

  selectedGoodsInwardsItem: any
  nomenclatures: Nomenclature[]
  private url = 'https://whale-app-cb8sf.ondigitalocean.app/nomenclature';
  private urlGoodsInwards = 'https://whale-app-cb8sf.ondigitalocean.app/goods-inwards';
  goodsInwards: GoodsInwards[] = [];

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
      this.loadGoodsInwards()
  }

  loadGoodsInwards() {
    this.http.get<GoodsInwards[]>(this.urlGoodsInwards).subscribe((data) => {
      this.goodsInwards = data
    })
  }

  openModal(item: any) {
    this.selectedGoodsInwardsItem = item
    }


  public loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.nomenclatures = data;
    });
  }

  deleteGoodsInwards(item: any) {
    const id = item.id
    const url = `https://whale-app-cb8sf.ondigitalocean.app/goods-inwards/${id}`
    this.http.delete(url).subscribe(() => {
      this.loadGoodsInwards()
    })
  }

  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

}
