export default function StatusBlock ({result}) {
    return (
        <div style={{padding: '1rem'}}>
            <table>
                <tbody>
                    <tr>
                        <td style={{textAlign: 'right'}}>
                            url:
                        </td>
                        <td>
                            {result.url}
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: 'right'}}>
                            statusCode:
                        </td>
                        <td>
                            {result.statusCode}
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: 'right'}}>
                            duration:
                        </td>
                        <td>
                            {result.duration}
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: 'right'}}>
                            date:
                        </td>
                        <td>
                            {result.date}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};