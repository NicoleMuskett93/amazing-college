//import $ from jQuery;

class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.resultsDiv = jQuery("#search-overlay__results");
    this.openButton = jQuery(".js-search-trigger");
    this.closeButton = jQuery(".search-overlay__close");
    this.searchOverlay = jQuery(".search-overlay");
    this.searchField = jQuery("#search-term");
    this.events();
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;
  }

  //2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    jQuery(document).on("keyup", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  //3. method/functions

  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer); //reset the timer
      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
        }
        this.isSpinnerVisible = true;
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
    }

    this.previousValue = this.searchField.val(); //gives value
  }

  getResults() {
    jQuery.getJSON(
      "https://garyb133.sg-host.com/wp-json/wp/v2/posts?search=" +
        this.searchField.val(),
      (posts) => {
        //takes posts as parameter and there we can target parts of the json to implement into the code such as title
        this.resultsDiv.html(`
        <h2 class = "search-overlay__section-title">General Informaiton</h2>
        <ul class="link-list min-list"> 
        ${posts
          .map(
            (item) =>
              `<li><a href="${item.link}">${item.title.rendered}</a></li>`
          )
          .join("")}
        </ul>
        `);
      }
    );
  }

  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !jQuery("input, textarea").is(":focus")) {
      //if there isnt anoter textarea in focus
      this.openOverlay();
    }
    if (e.keyCode == 27) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    jQuery("body").addClass("body-no-scroll"); //stops scrolling once overlay is opened
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    jQuery("body").removeClass("body-no-scroll"); //once class is removed and overlay closed, scrolling is implemented again
  }
}

export default Search;
