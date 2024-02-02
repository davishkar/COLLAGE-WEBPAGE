// Retina.js, a high-resolution image swapper (http://retinajs.com), v0.0.2

(function () {
    function RetinaImagePath(path) {
      this.path = path;
      var parts = this.path.split(".");
      var name = parts.slice(0, parts.length - 1).join(".");
      var extension = parts[parts.length - 1];
      this.at_2x_path = name + "@2x." + extension;
    }
  
    RetinaImagePath.confirmed_paths = [];
  
    RetinaImagePath.prototype.is_external = function () {
      return !!this.path.match(/^https?\:/i) && !this.path.match("//" + document.domain);
    };
  
    RetinaImagePath.prototype.check_2x_variant = function (callback) {
      var xhr = this.is_external() ? null : new XMLHttpRequest();
      var self = this;
  
      if (this.is_external()) {
        callback(false);
        return;
      }
  
      if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
        callback(true);
        return;
      }
  
      xhr.open("HEAD", this.at_2x_path);
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
          callback(false);
        } else if (xhr.status >= 200 && xhr.status <= 399) {
          RetinaImagePath.confirmed_paths.push(self.at_2x_path);
          callback(true);
        } else {
          callback(false);
        }
      };
      xhr.send();
    };
  
    function RetinaImage(element) {
      this.el = element;
      this.path = new RetinaImagePath(this.el.getAttribute("src"));
      var self = this;
  
      this.path.check_2x_variant(function (has2xVariant) {
        if (has2xVariant) {
          self.swap();
        }
      });
    }
  
    RetinaImage.prototype.swap = function (newPath) {
      function waitAndSwap() {
        if (self.el.complete) {
          self.el.setAttribute("width", self.el.offsetWidth);
          self.el.setAttribute("height", self.el.offsetHeight);
          self.el.setAttribute("src", newPath);
        } else {
          setTimeout(waitAndSwap, 5);
        }
      }
  
      if (typeof newPath === "undefined") {
        newPath = this.path.at_2x_path;
      }
  
      var self = this;
      waitAndSwap();
    };
  
    if (window.devicePixelRatio > 1) {
      window.onload = function () {
        var images = document.getElementsByTagName("img");
        var imageInstances = [];
  
        for (var i = 0; i < images.length; i++) {
          var currentImage = images[i];
          imageInstances.push(new RetinaImage(currentImage));
        }
      };
    }
  })();
  