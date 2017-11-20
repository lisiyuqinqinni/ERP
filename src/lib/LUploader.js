(function() {
  window.LUploader = function(el, params) {
    this.trigger = el;
    this.params = params;
    this.init();
  };

  LUploader.prototype.init = function() {
    var _self = this;   
    console.log(_self)
    //限制上传类型 
    _self.trigger.setAttribute('accept', _self.params.accept);
    //多张图片上传，创建multiple属性
    if(_self.params['multiple'] != null){
	    _self.trigger.setAttribute('multiple', 'multiple');
	  }

    var area= document.querySelector('#' + _self.params['imgname'] + 'area'); // 选择最外层的div
    var btn = document.querySelector('#' + _self.params['imgname'] + 'btn'); // 上传图片按钮
  	btn.addEventListener('click', function() {
      _self.trigger.click();
    });

    // 回显原图片
    var echoPhotos = _self.params['returnData'];
    if (echoPhotos) {
        echoPhotos = echoPhotos.split(/[;]+/);
        if (echoPhotos.length==0){
        	 return  ;
        }
        var photoUrl = "";
        for (var i=0; i<echoPhotos.length; i++) {
            var a = document.createElement("a");
//          a.setAttribute('data-gallery', '');
            a.setAttribute('class', 'picList');
//          a.setAttribute('href', echoPhotos[i]);
            a.innerHTML =
                '<input value="'+echoPhotos[i]+'" type="hidden">' +
                '<button type="button" class="close del" aria-label="Close">' +
                '    <span aria-hidden="true" class="delBtn">&times;</span>' +
                '</button>' +
                '<img src="'+ _selfUrl + echoPhotos[i]+'" class="huixian">';
            _self.trigger.parentElement.querySelector('.LUploader-list').appendChild(a);
            photoUrl += echoPhotos[i] + ";";
        }
        document.querySelector('#' + _self.params['imgname']).value = photoUrl.substring(0,photoUrl.length-1);
    }

    // 删除图片
    area.addEventListener("click", function(e) {
        var target = e.target;
        var delBtns = area.querySelectorAll(".del span.delBtn");
        for (var i=0; i<delBtns.length; i++) {
            var del = delBtns[i];
            if (target!=del)
                continue;
            e.stopPropagation();
            window.event? window.event.returnValue = false : e.preventDefault();
            if (confirm("确认删除么？")) {
                var a = del.parentNode.parentNode;//a标签
                a.parentNode.removeChild(a);
                var urlinput=area.getElementsByClassName("imgtotalurl");
                var totalinput=area.getElementsByClassName("LUploader-list"); //ul
                var totalinputs=totalinput[0].getElementsByTagName('input');
                var totalurl='';
                for(var i = 0; i < totalinputs.length; i++) {
                    totalurl += totalinputs[i].value + ";";
                }
                urlinput[0].value=totalurl;
            }
            break;
        }
    });

		// input change事件
    _self.trigger.addEventListener('change', function() { 
      var files = Array.prototype.slice.call(this.files);
      files.forEach(function(file, i) {
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)){
        	return;
        }
        var reader = new FileReader();  // 读取上传的文件
        var imgSize = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
        var a = document.createElement("a");
        //a.setAttribute('data-gallery','');
        a.setAttribute('class','picList');
        a.innerHTML = '<input type="hidden"><button type="button" class="close del" aria-label="Close"><span aria-hidden="true" class="delBtn">&times;</span></button><div class="LUploader-progress"><span></span></div><img src="" class="huixian">';
        if (_self.params.showsize) {
          var div_size = document.createElement('div'); // 显示图片大小
          div_size.className = 'LUploader-size';
          div_size.textContent = imgSize;
          a.appendChild(div_size);
        }
        var LUploaderList = _self.trigger.parentElement.querySelector('.LUploader-list');  // ul
        // 假如是单个上传
        if (_self.params['multiple'] == null) {
          if (_self.old_a) {
            LUploaderList.removeChild(_self.old_a);
            _self.old_a = a;
          } else {
            _self.old_a = a;
          }
        }
        LUploaderList.appendChild(a);
        reader.onload = function() {
          var params = dataSet(_self.trigger); // 访问自定义属性
          var url = _self.params.url;
          var result = this.result; // 读取到的结果
          var img = new Image();  // 创建图像对象
        	img.src = result;
//        a.href =result;
          if (result.length <= _self.params.maxsize) {
            img = null;
            _self.upload(url, params, result, file.type, a,area);
            return;
          }
          // complete可以判断是否加载完成 并在缓存中存在
          if (img.complete) {
            callback();
          } else {
            img.onload = callback; // 图片加载成功 触发事件
          }

          function callback() {
            var data = _self.compress(img); // 压缩再上传
            _self.upload(url, params, data, file.type, a,area);
            img = null;
          }
        };
        reader.readAsDataURL(file);
      });
    });
  };
  LUploader.prototype.compress = function(img) { // 图片压缩
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var moreCanvas = document.createElement("canvas");
    var morectx = moreCanvas.getContext("2d");
    var maxsize = 1024 * 1024;
    var width = img.width;
    var height = img.height;
    var ratio; // 比例
    if ((ratio = width * height / 4000000) > 1) {
      ratio = Math.sqrt(ratio);//返回一个数的平方根
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var count;
    if ((count = width * height / 1000000) > 1) {
      count = ~~(Math.sqrt(count) + 1);
      var nw = ~~(width / count);
      var nh = ~~(height / count);
      moreCanvas.width = nw;
      moreCanvas.height = nh;
      for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
          morectx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
          ctx.drawImage(moreCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height); //  drawImage接口绘制到Canvas 2d中
    }
    var ndata = canvas.toDataURL('image/jpeg', this.params.quality); // toDataUrl接口把图片转成base64编码字符串
    moreCanvas.width = moreCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
  };
  LUploader.prototype.upload = function(url, obj, basestr, type, a,self) {
    var text = window.atob(basestr.split(",")[1]);
    var buffer = new Uint8Array(text.length);
    var pecent = 0;
    var _self = this;
    for (var i = 0; i < text.length; i++) {
      buffer[i] = text.charCodeAt(i);
    }
    var span = a.querySelector('.LUploader-progress').querySelector('span');
    var xhr = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.onload = function(e) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
        var data = JSON.parse(xhr.responseText);
        var result = data['status'];
        var photoURL=data['photoURL'];
//      a.href =data['photoURL'];
        var liimg=a.getElementsByClassName("huixian");
        liimg[0].src = _selfUrl + data['photoURL'];
        var input=a.querySelector('input');
        input.value=photoURL;  //li中的input放入返回的总路径
      	//图片总路径放入input
        var urlinput=self.getElementsByClassName("imgtotalurl");
        var totalinput=self.getElementsByClassName("LUploader-list")  // ul
        var totalinputs=totalinput[0].getElementsByTagName('input');
        var totalurl='';
        for(var i = 0; i < totalinputs.length; i++) { //多张上传时 路径拼接
        	totalurl += totalinputs[i].value + ";";
        }
        urlinput[0].value = totalurl.substring(0,totalurl.length-1);
        parent.vm.$store.commit('enlargePhoto');
        
       //图片总路径放入input结束
        var text = result == 0 ? '上传成功' : '上传失败';
        span.style['width'] = '100%';
        span.innerHTML = text;
      } else {
        span.innerHTML = '上传失败';
      }
    }
    xhr.upload.addEventListener('progress', function(e) {
      pecent = ~~(100 * e.loaded / e.total);
      span.style['width'] = pecent + '%';
      span.innerHTML = (pecent == 100 ? 99 : pecent) + '%';
    }, false);
    var data = {};
    for (var key in obj) {
      if (key !== 'luploader') {
        if (obj[key] == 'basestr') {
          data[key] = basestr;
        } else {
          data[key] = obj[key];
        }
      }
    };
    data['imgname']=_self.params.imgname
    data['type']=_self.params.type
    data = serializeObject(data);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(data);
  }

  function isArray(arr) {
    if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
    else return false;
  };

  function serializeObject(obj) {
    if (typeof obj === 'string') return obj;
    var resultArray = [];
    var separator = '&';
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (isArray(obj[prop])) {
          var toPush = [];
          for (var i = 0; i < obj[prop].length; i++) {
            toPush.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop][i]));
          }
          if (toPush.length > 0) resultArray.push(toPush.join(separator));
        } else {
          resultArray.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
        }
      }

    }
    return resultArray.join(separator);
  };

  function dataSet(el) {
    var dataset = {};
    for (var i = 0; i < el.attributes.length; i++) {
      var attr = el.attributes[i];
      if (attr.name.indexOf('data-') >= 0) {
        dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
      }
    }
    return dataset;
  }

  function toCamelCase(string) {
    return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
  };
})();
