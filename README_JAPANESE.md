# GAS Google Map Web App

このプロジェクトは、Google Apps Script (GAS) を使用してセンサーデータをGoogleマップ上に表示するウェブアプリケーションです。気温、気圧、湿度、照度などのデータをカラーマーカーで視覚化します。

## 特徴

- **気温データ**: カラーマーカーで気温データを表示します。
- **気圧データ**: カラーマーカーで気圧データを表示します。
- **湿度データ**: カラーマーカーで湿度データを表示します。
- **照度データ**: カラーマーカーで照度データを表示します。
- **動的データ更新**: センサーデータを毎分取得して更新します。
- **レスポンシブデザイン**: ユーザーの操作に基づいて地図のズームやマーカーの表示を調整します。

## ファイル構成

- **code.gs**: ウェブアプリのロジックとデータ視覚化を処理するメインのGoogle Apps Scriptコード。
- **list.html**: ウェブインターフェースをレンダリングし、Googleマップを統合するためのHTMLテンプレートファイル。
- **README.md**: このファイル。プロジェクトの概要を提供します。

## セットアップ

1. **リポジトリをクローン**:
    ```bash
    git clone https://github.com/ryota1431/GAS_googlemap_webapp.git
    cd GAS_googlemap_webapp
    ```

2. **Google Apps Scriptのセットアップ**:
    - Google ドライブを開きます。
    - 新しいGoogle Apps Scriptプロジェクトを作成します。
    - `code.gs`の内容をスクリプトエディタにコピーします。
    - Apps ScriptプロジェクトにHTMLファイルを作成し、`list.html`の内容をコピーします。

3. **Google Maps APIキーの取得**:
    - [Google Cloud Console](https://console.cloud.google.com/)からGoogle Maps APIキーを取得します。
    - `list.html`ファイル内の`YOUR_API_KEY`を実際のAPIキーに置き換えます。

4. **ウェブアプリのデプロイ**:
    - Apps Scriptエディタで「デプロイ」 > 「新しいデプロイ」をクリックします。
    - 「ウェブアプリ」を選択し、設定を構成します。
    - ウェブアプリをデプロイし、ウェブアプリのURLをメモします。

## 使用方法

- ブラウザでデプロイされたウェブアプリのURLを開きます。
- 表示するデータのタイプ（気温、気圧、湿度、または照度）を選択します。
- 選択したデータタイプに基づいてマップにマーカーが表示され、最新のセンサーデータで毎分更新されます。

## センサーから取得するデータを追加する方法

新しいセンサーデータを追加するには、以下の手順に従ってください。

1. **データリストの作成**: `code.gs`ファイルで新しいセンサーデータのリストを作成します。たとえば、風速データを追加する場合:
    ```javascript
    var windSpeedList = ["WindSpeed", "風速データの表示", colorlist5, "textSize1", "wind_marker", true];
    ```

2. **カラーリストの定義**: 新しいデータタイプに対応するカラーリストを定義します。例えば:
    ```javascript
    var colorlist5 = [
      [30, `rgb(180, 0, 104)`],
      [20, `rgb(255, 40, 0)`],
      [10, `rgb(255, 153, 0)`],
      [0, `rgb(0, 150, 255)`],
    ];
    ```

3. **データリストに追加**: `dataList`に新しいデータリストを追加します。
    ```javascript
    const dataList = [tempList, pressList, humList, illList, windSpeedList];
    ```

4. **HTMLテンプレートの更新**: `code.gs`
    ```javascript
    function doGet() {
      // テンプレートを使ってHTML文書を作って return
      let template = HtmlService.createTemplateFromFile("list");
      template.tempList = tempList;
      template.pressList = pressList;
      template.humList = humList;
      template.dataList = dataList;
      template.illList = illList;
      template.windSpeedList = windSpeedList;
      return template.evaluate();
    }
    ```

これで新しいセンサーデータを表示する準備が整いました。

## コントリビュート

1. リポジトリをフォークします。
2. 新しいブランチを作成します (`git checkout -b feature-branch`)。
3. 変更をコミットします (`git commit -am 'Add new feature'`)。
4. ブランチをプッシュします (`git push origin feature-branch`)。
5. プルリクエストを開きます。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。

## 謝辞

- Google Maps API
- Google Apps Script





# `list.html` JavaScript 関数仕様書

## 1. 定数定義

```javascript
const maps = {};
const apiUrl = 'https://script.google.com/macros/s/AKfycbzQlHI563x1UTvCi645dFS8IciQ-iQJxpCj9ys6FW6R_x-juOz1MU0zlEaFDcYWtsY/exec';
```
maps: マップインスタンスを保存するオブジェクト。
apiUrl: センサーデータを取得するためのAPIのURL。
## 2. 初期化関数
### initMap
```JavaScript
function initMap() {
  const centerLocation = { lat: 37.900175106232396, lng: 140.1043221055276 };

  <? for (let i = 0; i < dataList.length; i++) { ?>
    <? output.append(dataList[i][0]); ?> = new google.maps.Map(document.getElementById('<?= dataList[i][0] ?>'), {
      zoom: 17,
      center: centerLocation,
      mapTypeId: 'terrain',
      styles: darkModeStyle,
    });
  <? } ?>

  <? for (let i = 0; i < dataList.length; i++) { ?>
    async function <? output.append('update' + dataList[i][0] + 'Data'); ?>() {
      const <? output.append(dataList[i][0] + 'Colors'); ?> = [
        <? for (let j = 0; j < dataList[i][2].length; j++){ ?>
          [ <?= dataList[i][2][j][0] ?> ,<?= dataList[i][2][j][1] ?> ],
        <? } ?>
      ];
      await updateMapData(apiUrl, <? output.append(dataList[i][0]); ?>, <? output.append(dataList[i][4]); ?>, '<?= dataList[i][0] ?>', <? output.append(dataList[i][0] + 'Colors'); ?>);
    }
    <? output.append('update' + dataList[i][0] + 'Data'); ?>();
    setInterval(<? output.append('update' + dataList[i][0] + 'Data'); ?>, 60000);
  <? } ?>
}
```
説明: Googleマップを初期化し、各データタイプに対してマップとデータ更新関数を定義する。
引数: なし
戻り値: なし
## 3. データ更新関数
### updateMapData
```JavaScript
async function updateMapData(apiUrl, map, markers, dataKey, colorList) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const latestDataByMac = {};

    data.forEach(item => {
      const macAddress = item["MAC Address"];
      const epochTime = item["Epoch Time"];

      if (!latestDataByMac[macAddress] || epochTime > latestDataByMac[macAddress]["Epoch Time"]) {
        latestDataByMac[macAddress] = item;
      }
    });

    Object.values(latestDataByMac).forEach(item => {
      const lat = item["Latitude"];
      const lng = item["Longitude"];
      const value = item[dataKey];

      addMarker({ lat, lng, value, dataKey }, map, markers, colorList);
    });
  } catch (error) {
    console.error("データ取得エラー:", error);
  }
}
```
説明: APIからセンサーデータを取得し、最新のデータをマップに表示する。
引数:
apiUrl: データを取得するAPIのURL
map: Googleマップインスタンス
markers: マーカーを格納する配列
dataKey: データの種類（例：Temperature, Pressure）
colorList: データ値に対応するカラーリスト
戻り値: なし
## 4. マーカー追加関数
### addMarker
```JavaScript
function addMarker({ lat, lng, value, dataKey }, map, markers, colorList) {
  const label = `${value}${dataKey === "Temperature" ? "℃" : dataKey === "Pressure" ? "hPa" : dataKey === "Illuminance" ? "lux" : "%"}`;

  for (var i = 0; i < colorList.length; i++){
    if (value > colorList[i][0]) {
      var color = colorList[i][1];
      break;
    }
  }
  if (value < colorList[colorList.length - 1][0]){
    var color = `rgb(0, 0, 0)`;
  }

  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    label: {
      text: label,
      color: color,
      fontSize: "24px",
    },
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 0.5,
        scale: 0,
        strokeColor: "white",
        strokeWeight: 0.5,
      },
  });
  markers.push(marker);
}
```
説明: マップにマーカーを追加する。
引数:
lat: 緯度
lng: 経度
value: センサーデータの値
dataKey: データの種類（例：Temperature, Pressure）
map: Googleマップインスタンス
markers: マーカーを格納する配列
colorList: データ値に対応するカラーリスト
戻り値: なし






# Spread Sheet側のGASのコード
```javascript
/**
 * スプレッドシートのデータを JSON 形式で返す関数
 */
function doGet(e) {
  // スプレッドシートのIDを指定
  const sheetId = '1ywFj1Trf-Va0TR5-WG7uPlH_dWaFYsx4_LFNx2tk8bA';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('sensor');
  const data = sheet.getDataRange().getValues();

  // ヘッダー（1行目）をキーとして使用
  const headers = data[0];
  const jsonData = [];

  // 2行目以降のデータを JSON オブジェクトに変換
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    jsonData.push(obj);
  }
  Logger.log(jsonData);

  // JSON をレスポンスとして返す
  return ContentService.createTextOutput(JSON.stringify(jsonData)).setMimeType(ContentService.MimeType.JSON);
}
```
