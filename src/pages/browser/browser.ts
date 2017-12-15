import { Component } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';

/**
 * Exemplo de código para explorar capacidades do navegador
 * do usuário sem precisar recorrer a plugins de cordova nem
 * hardware do dispositivo
 * 
 * Generated class for the BrowserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 * 
 * @author Everton Canez
 */


let width = window.innerWidth;    // We will scale the photo width to this
let height = 0;     // This will be computed based on the input stream
let streaming = false;
let video = null;
let canvas = null;
let startbutton = null;
let picturebutton = null;
let stopbutton = null;
let localStream = null;

@IonicPage()
@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html',
})
export class BrowserPage {

  dica: string = "";
  show: boolean = false;
  position: string = "";
  video = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.dica = "Este exemplo utiliza as capacidades do navegador para acessar o hardware do dispositivo sem precisar de plugins do cordova. Recomendamos fortemente seu uso para aplicatiuos baseados em PWA.";
  }

  private geolocation(): Promise<any> {
    if (navigator.geolocation) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (position) {
          resolve(position);
        });
      }).catch(err => {
        console.log('Browser não suporta gelocalização!');
      });
    }
  }

  /**
   * Exemplo de captura de gelocalização
   */
  getLocation() {

    let loader = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    loader.present();

    this.geolocation().then(position => {
      this.position = position.coords.latitude + ', ' + position.coords.longitude;
      loader.dismiss();
    }, (err) => {
      console.log(err);
      loader.dismiss();
      alert('err: ' + err);
    });
  }

  hasGetUserMedia() {
    return !!(navigator.getUserMedia);
  }

  /**
   * Inicia o streaming de vídeo
   */
  start() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    startbutton = document.getElementById('startbutton');
    picturebutton = document.getElementById('picturebutton');
    stopbutton = document.getElementById('stopbutton');

    canvas.style.display = "none";
    startbutton.style.display = "none";
    picturebutton.style.display = "block";
    stopbutton.style.display = "block";

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        localStream = stream;
        video.style.display = "block";
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("Ocorreu um erro! " + err);
      });

    video.addEventListener('canplay', function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

  }

  /**
   * Método para exibir o box 
   * com a dica de como utilizar este exemplo
   * @param show
   */
  showTip(show: boolean = true): void {
    this.show = show ? true : false;
  }

  /**
   * Método que captura o frame 
   * do streaming de vídeo
   */
  takeSnapshot() {
    var context = canvas.getContext('2d');
    if (video.videoWidth && video.videoHeight) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.display = "block";
      context.drawImage(video, 0, 0, width, height);
    } else {
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * Método para para a câmera,
   * seja no botão de parada
   * ou quando o usuário sai da página
   */
  stopCamera() {
    picturebutton.style.display = "none";
    startbutton.style.display = "block";
    stopbutton.style.display = "none";
    video.style.display = "none";

    video.pause();
    video.srcObject = null;
    var track = localStream.getTracks()[0]; // if only one media track
    track.stop();

    console.log("Saiu e desligou a camera!");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowserPage');
  }

  ionViewWillLeave() {
    // saindo da página desliga a câmera
    this.stopCamera();
  }

}
