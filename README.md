# GAS Google Map Web App

This project is a Google Apps Script (GAS) web application for displaying sensor data on Google Maps. The application visualizes different types of data such as temperature, pressure, humidity, and illuminance using color-coded markers.

## Features

- **Temperature Data**: Displays temperature data with color-coded markers.
- **Pressure Data**: Displays pressure data with color-coded markers.
- **Humidity Data**: Displays humidity data with color-coded markers.
- **Illuminance Data**: Displays illuminance data with color-coded markers.
- **Dynamic Data Update**: Fetches and updates sensor data every minute.
- **Responsive Design**: Adjusts map zoom and marker visibility based on user interaction.

## File Structure

- **code.gs**: Contains the main Google Apps Script code for handling the web app logic and data visualization.
- **list.html**: HTML template file for rendering the web interface and integrating Google Maps.
- **README.md**: This file, providing an overview of the project.

## Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ryota1431/GAS_googlemap_webapp.git
    cd GAS_googlemap_webapp
    ```

2. **Google Apps Script Setup**:
    - Open Google Drive.
    - Create a new Google Apps Script project.
    - Copy the contents of `code.gs` into the script editor.
    - Create an HTML file in the Apps Script project and copy the contents of `list.html` into it.

3. **Google Maps API Key**:
    - Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/).
    - Replace `YOUR_API_KEY` in the `list.html` file with your actual API key.

4. **Deploy the Web App**:
    - Click on `Deploy` > `New deployment` in the Apps Script editor.
    - Choose `Web app` and configure the settings.
    - Deploy the web app and note the web app URL.

## Usage

- Open the deployed web app URL in a browser.
- Select the type of data you want to display (Temperature, Pressure, Humidity, or Illuminance).
- The map will display markers based on the selected data type and update every minute with the latest sensor data.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Google Maps API
- Google Apps Script
