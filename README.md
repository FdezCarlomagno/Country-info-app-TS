# Country Management Application

This project is a React-based application that provides information about country-related data. It allows users to fetch and display information about countries, states, and specific country details through a context-based architecture. The project utilizes an API to fetch data and React Context API to manage global state.

---

## Features
- **Fetch Countries**: Retrieve a list of countries from the backend API.
- **Filter Countries**: Manage filtered views of the countries.
- **Country Details**: Fetch detailed information about a specific country.
- **State Information**: Retrieve states for a given country.
- **Global State Management**: Uses React Context API to share state across the application.

---

## Technology Stack

### Frontend
- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript for type safety and scalability.

### Backend
- Custom API for managing country, state, and detailed information. Interfaces for models are imported from the backend.
- [Node.js](https://nodejs.org/): JavaScript runtime for backend services.

---

## Project Structure

```plaintext
src/
|-- api/
|   |-- country.service.ts    # API calls to fetch data from the backend
|
|-- context/
|   |-- ContextProvider.tsx   # Context provider for managing global state
|
|-- interfaces/
|   |-- models.ts             # TypeScript interfaces for data models
|
|-- components/
|   |-- CountryList.tsx       # Component to display the list of countries
|   |-- CountryDetails.tsx    # Component to display country-specific information
|
|-- App.tsx                   # Main application entry point
|-- index.tsx                 # Application bootstrap file
```

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/country-management-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd country-management-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

The project communicates with the backend API to fetch country and state data. Below are the key endpoints:

### Base URL
```
http://localhost:3000/api
```

### Endpoints
- **GET /countries**: Fetch all countries.
- **GET /countries/:countryCode**: Fetch details for a specific country by its code.
- **POST /states**: Fetch states for a given country by its name. 
    - Body: 
        ```json
            {
                "country": "countryName"
            }
        ```

---

## Context API

This project uses React's Context API for global state management. The context is defined in `ContextProvider.tsx`. Key properties and methods exposed by the context include:

### Properties
- `baseUrl`: Base URL of the API.
- `error`: Current error message, if any.
- `countries`: List of fetched countries.
- `country`: Details of a selected country.
- `states`: States of a selected country.
- `filteredCountries`: Filtered list of countries.

### Methods
- `setError`: Function to update the error message.
- `setCountries`: Function to update the list of countries.
- `fetchCountries`: Fetch all countries from the API.
- `setCountry`: Function to update the selected country.
- `fetchCountry`: Fetch detailed information for a specific country.
- `setStates`: Function to update the states of a selected country.
- `fetchStates`: Fetch states for a given country.
- `setFilteredCountries`: Function to update the filtered list of countries.

---

## Usage

### Fetching Countries
To fetch all countries, call the `fetchCountries` method exposed by the context:

```typescript
const { fetchCountries } = useContext(AppContext);
useEffect(() => {
    fetchCountries();
}, []);
```

### Fetching Country Details
To fetch details for a specific country, use the `fetchCountry` method:

```typescript
const { fetchCountry } = useContext(AppContext);
fetchCountry('US');
```

### Fetching States
To fetch states for a country, use the `fetchStates` method:

```typescript
const { fetchStates } = useContext(AppContext);
fetchStates('United States');
```

---

## Contributions
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Open a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).
---

## Contact
For any questions or feedback, please contact:
- **Name**: Valentin F. Carlomagno
- **Email**: valentinfcarlomagno@gmail.com
- **GitHub**: [mi-github-profile](https://github.com/FdezCarlomagno)

