import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isCollapsed: boolean = true;
  isShow: boolean = false;
  error: '' | any;
  shortenForm: FormGroup | any;
  getLinks: any = []; 
  copyBtnValue = 'Copy'
  localItem : string | any;
  CopyText: boolean= true;
  constructor(private _formbuilder: FormBuilder, private _authservice: AuthService, private _http: HttpClientModule) { 
    
  }

  ngOnInit(): void {
    this.shortenForm = this._formbuilder.group({
      link:['', [Validators.required]]
    })
    console.log(this.getLinks)
    this.getData();
  }

  get link() {
    return this.shortenForm.get('link');
  }

  showNav() {
    this.isCollapsed = !this.isCollapsed;
    this.isShow = !this.isShow
    console.log('click', this.isShow)
  }

  getData() {
    this.localItem = localStorage.getItem("setLinks");
    if(this.localItem == null) {
      this.getLinks = [];
    } else {
      this.getLinks = JSON.parse(this.localItem);
    }
    
  }

  onSubmit() {
    this.shortenForm.markAllAsTouched();
    if(this.shortenForm.invalid) {
      this.error = 'Please add a link';
    } else {
      var data = this.shortenForm.value.link;
      //console.log(data)
      this._authservice.postLink(data).subscribe((res: any) => {
        console.log(res);
        let showLinks: any = {}
        
        showLinks.full_short_link = res.result.full_short_link;
        showLinks.original_link = res.result.original_link;
        showLinks.button = 'Copy'
        showLinks.buttonColor = 'btn-info'
        this.getLinks.unshift(showLinks);
        console.log(this.getLinks)
        localStorage.setItem("setLinks",  JSON.stringify(this.getLinks));
        this.getData()
        
      }, (errors) =>{
        console.log(errors)
      })
    }
  }

  copyLink(shortLink: any,e:any, index:any) {
    console.log(e)
    shortLink.select();
    document.execCommand('copy');
    shortLink.setSelectionRange(0, 99999);   
    //alert("Copied the text: " + shortLink.value);
    e.button = 'Copied!'
    e.buttonColor = 'copied-btn'
  }

}
