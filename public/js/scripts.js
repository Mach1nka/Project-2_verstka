;(function ($,undefined) {
  var $grid=$('.post-list').imagesLoaded( function() {
    $grid.masonry({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.post-item',
      // use element for option
      columnWidth: '.post-item-sizer',
      percentPosition: true
    });
  });
})(jQuery);

function formValidation() {
  var self = this;
  this.fieldName = document.getElementById('name');
  this.fieldEmail = document.getElementById('email');
  this.fieldText = document.getElementById('text');
  this.form = document.getElementById('form');

  function addInvalidClass(el) {
    el.closest('.contact-field-write').classList.add('error');
    el.closest('.contact-field-write').classList.remove('success');
  }

  function addValidClass(el) {
    el.closest('.contact-field-write').classList.add('success');
    el.closest('.contact-field-write').classList.remove('error');
  }

  function nameValidate() {
    if(self.fieldName.value === "") {
      addInvalidClass(self.fieldName);
      return false;
    } else {
      addValidClass(self.fieldName);
      return true;
    }
  }

  function emailValidate() {
    if(self.fieldEmail.value === "") {
      addInvalidClass(self.fieldEmail);
      return false;
    } else {
      addValidClass(self.fieldEmail);
      return true;
    }
  }

  function textValidate() {
    if(self.fieldText.value === "") {
      addInvalidClass(self.fieldText);
      return false;
    } else {
      addValidClass(self.fieldText);
      return true;
    }
  }

  function addComment(name, text) {
    var commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.innerHTML = '<span class="comment-item-name">' + name + '</span><div class="comment-item-text"><p>' + text + '</p></div>';
    var commentList = document.getElementsByClassName('comment-list');
    commentList[0].appendChild(commentItem);
  }

  function formValidate(event) {
    event.preventDefault();
    var isNameValid = nameValidate();
    var isEmailValid = emailValidate();
    var isTextValid = textValidate();

    if (isNameValid && isEmailValid && isTextValid) {
      addComment(self.fieldName.value, self.fieldText.value);
    }

  }
  function bindFormEvents() {
    self.fieldEmail.addEventListener('focusout', emailValidate);
    self.fieldName.addEventListener('focusout', nameValidate);
    self.fieldText.addEventListener('focusout', textValidate);
    self.form.addEventListener('submit', formValidate);
  }

  this.init = function() {
    bindFormEvents();
  }
}

var validation = new formValidation();
validation.init();
