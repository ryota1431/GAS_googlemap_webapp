//カラーリスト
//Temprature
var colorlist1 = [
  [35, `rgb(180, 0, 104)`],
  [30, `rgb(255, 40, 0)`],
  [25, `rgb(255, 153, 0)`],
  [20, `rgb(250, 245, 0)`],
  [15, `rgb(255, 255, 150)`],
  [10, `rgb(255, 255, 240)`],
  [5, `rgb(185, 235, 255)`],
  [0, `rgb(0, 150, 255)`],
  [-5, `rgb(0, 65, 255)`],
  [-273, `rgb(0, 32, 128)`],
];

//Pressure
var colorlist2 = [
  [1020, `rgb(0, 150, 255)`],
  [1010, `rgb(0, 200, 150)`],
  [1000, `rgb(0, 255, 0)`],
  [0, `rgb(255, 0, 0)`],
];

//Humidity
var colorlist3 = [
  [90, `rgb(180, 0, 104)`],
  [80, `rgb(255, 40, 0)`],
  [70, `rgb(255, 153, 0)`],
  [60, `rgb(250, 245, 0)`],
  [50, `rgb(255, 255, 150)`],
  [40, `rgb(255, 255, 240)`],
  [30, `rgb(185, 235, 255)`],
  [20, `rgb(0, 150, 255)`],
  [10, `rgb(0, 65, 255)`],
  [0, `rgb(0, 32, 128)`],
];

//Illuminance
var colorlist4 = [
  [58982, `rgb(180, 0, 104)`],
  [52429, `rgb(255, 40, 0)`],
  [45876, `rgb(255, 153, 0)`],
  [39323, `rgb(250, 245, 0)`],
  [32770, `rgb(255, 255, 150)`],
  [26217, `rgb(255, 255, 240)`],
  [19664, `rgb(185, 235, 255)`],
  [13111, `rgb(0, 150, 255)`],
  [6558, `rgb(0, 65, 255)`],
  [0, `rgb(0, 32, 128)`],
];




//データリスト
const tempList = ["Temperature","気温データの表示", colorlist1, "textSize1", "temp_marker", true];
const pressList = ["Pressure", "気圧データの表示",colorlist2, "textSize1", "press_marker", true];
const humList = ["Humidity", "湿度データの表示",colorlist3, "textSize1", "hum_marker", true];
const illList = ["Illuminance", "照度データの表示",colorlist4, "textSize1", "ill_marker", true];

//データリストまとめたリスト
const dataList = [tempList, pressList, humList, illList];





function doGet() {
  // テンプレートを使ってHTML文書を作って return
  let template = HtmlService.createTemplateFromFile("list");
  template.tempList = tempList;
  template.pressList = pressList;
  template.humList = humList;
  template.dataList = dataList;
  template.illList = illList;
  return template.evaluate();
}


//データを追加するとき
//データリストを作成->データリストまとめたリストにデータリストを追加->template.データリスト=データリストをdoGet関数内に記載する。
