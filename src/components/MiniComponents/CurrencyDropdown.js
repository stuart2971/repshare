import { changeCurrency } from "../../utils/requests";

export default function CurrencyDropdown({ auth0ID, currency, setCurrency }) {
    async function changeCurrencyTo(curr) {
        console.log(curr);
        if (auth0ID) await changeCurrency(auth0ID, curr);
        setCurrency(curr);
    }

    return (
        <select
            onChange={(e) => changeCurrencyTo(e.target.value)}
            className="filter_dropdown faded50"
            value={currency}
        >
            <option value="CNY">Yuan</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="USD">American Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">Pound</option>
            <option value="SEK">Krona</option>
        </select>
    );
}
