export default function TableRow({ number, name, price, growIndex }) {

    return (
        <tr>
            <td>{number}</td>
            <td>{name}</td>
            <td>${price}</td>
            <td style={{ color: growIndex > 0 ? "green" : "red" }}>
                {growIndex > 0 ? "▲" : "▼"}
                {growIndex}%
            </td>
        </tr>
    );
}
