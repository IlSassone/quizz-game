class Loader{
    constructor(){
        this.loader = 
'          <div class="loading">'+
            '<div class="preloader-wrapper big active">'+
              '<div class="spinner-layer spinner-red-only">'+
                '<div class="circle-clipper left">'+
                  '<div class="circle"></div>'+
                '</div>'+
                '<div class="gap-patch">'+
                  '<div class="circle"></div>'+
                '</div>'+
                '<div class="circle-clipper right">'+
                  '<div class="circle"></div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>';
        this.isThere = false;
        
    }

    show(){
        if(!this.isThere) {
            $(document.body).append(this.loader);
            this.isThere = !this.isThere;
        }
    }

    hide(){
        if(this.isThere){
            $(".loading").remove();
            this.isThere = !this.isThere;
        }
    }


}