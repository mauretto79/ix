angular.module('IX.services')

.service('vCard', function(SharedProperties) {
    var sharedData = SharedProperties.sharedObject;

    return{

        /*set : function(obj) {

            var requestId = sharedData.connection.getUniqueId('roster'),
                iq = $iq({
                    type: 'set',
                    to: obj.jid,
                    id: requestId
                }).c('vCard', {
                    xmlns: Strophe.NS.VCARD
                }).c('photo').c('type').t('image/png').up().c('binval').t('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/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAklQTFRFJSUl////JSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlnGzOCwAAAMJ0Uk5TAAABAgMEBQYHCAkKCwwNDg8QERITFRYXGRobHB0eICEiJCUmJykqKy0uMDIzNjc4Ojs8PT4/QEFCRUdISkxNTlBRUlRWV1hZW1xdXl9hYmNlZ2lqbW5vcHJ0dXZ4eXt+f4CBg4SFhoeJiouMj5CRkpWWl5iZm5ydnqChoqOmp6mrrK2ur7Gys7S1t7i5vL2+wMLDxMXHyMrMzc7Q0tPV1tfZ2tvc3t/g4uPl5ujp6uvs7e7v8fLz9PX29/j5+vv8/f4PdIzkAAAFcUlEQVR42u3d2VtVZRiG8ae92SIoYhQSFoKSJqnRYGpaWlnRQEU0WJqWllJRWtqgZQ5hg0WFZVqIRpqkkpYhiiBteP+yDvTyMmT4Nntca933+Tr5Ha7vut5H15BzggAssMACCyywIAALLLDAAgssCMACCyywwAILgvRgKflNK4/5k6Bile4021UGlkPj13abmV2omwDWCIUeO2GXaq8OgTVcc/bZFe2vBGvIirfYgLZOBmvQxq48a1fVtSoHrKt74KgNWttSsAY08zsbsqYKsK7o+veiNkx9mwrBulTk+Q4boY5lY8CSpIWHzKHWRWBp6hfm2O7ygGPlv9lrzvXWTwwwVvipkxZTp2rCQcW64xeLuea5gcS6aZuNqu0lgcPKffW8jbLuNeMChRV6+JjF0fGqUHCwZu2xONs7OyBYkz7ot7jr31wUAKzsl85YQupcke13rPsOW8I6ssTXWNO/sYTWOMO3WAXvRC3BRTcU+BIrq/YvS0KnayP+w5rXYknq4AKfYZV+ZkmsocxHWHlreyyp9dTl+QQr9PgJS3rt/sC6bZ+lIj9gFX9sBpZTOSvPGVhuPXjUDCynKr43A8vtkXlj1MBywoq80GEGlhPWwl/NwHLCmvalGVhOWPlv9RpYTljhp0+ageWEdWezGVhOWCXbzMBywspdfd7AcsIKPXLMDCwnrFk/mIHlhFX0Yb+B5YSVvbzTDCwnrMWHzcBywpreaAaWE1bB+qiB5YQVqf3bDCwnrPktZmA5YZU2mIHlhJW3rsfAcsIKPdFuBpYTVuU+M7CcKv7EDCzHzhlYzhlYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWHHV/RpYru2YIrDcOnB35p6EyjCqU89kCSyn/n372ow+Y5dJVl/fnOEHEjOH6rd7M/70ZqZQnXlxjMByqv/9SV44F5wRVntu9cYh6gyg+uMhr5w4TztV1yu5AsutT2/00CxDeql+vt1Tgx/ppPrzybDAcurCG/leGylKm9XnU703f5UmqkP3eHFYLS1U/zwXEVhORd+9zqNjkKm3+namZ2dGU0119H4PD9imlursy2MFltuPmC03eHt0O4VWP83x+px7yqhOPBoSWG6PzK+Pj2XSINBYO6bENpURYKwD82LdYAkwVpbAck5ggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlgZjdWefKt232DlretJLlVPXZ5vsKTShmRaNZRJPsKS5rcki+rgAslnWIrUnk4G1elnI/IfllSwPppoquiGAsmXWNKMxsRaNd4i+RZLWnwkcVS/L5F8jaXs5Z2JoepckS2/Y0lFH/XHT9W/uUgKAJY068d4rfbOlgKCpVDVsXiojleFFBwsadzq7tFSda8ZJwUKSyrZPjqr7SVS4LCku5pjp2qeKwUSS+Gak7FRnaoJK6hY0sT6Xneq3vqJUoCxpPKvXK12l0sBx5IWtbpQtS6SwJIiyzpGoupYNkZgXaxwY99wVH2bCiWwLlfRNLRVU4UE1v9a2jY4VdtSCayB5azqupqqa1WOwBqsyVsHWm2dLIE1RJX7r6TaXymBNXSh6svP1+3VIYE1fBPqei4+Mk+QwBqxsl1mu8oksJwqLZWCiuX7wAILLLDAAovAAgsssMACi8ACCyywwAKL/gMvIM7wL4woiwAAAABJRU5ErkJggg==').tree();
    
            sharedData.connection.sendIQ(iq, obj.callback);
        },*/
        
        get : function(obj) {

            var requestId = sharedData.connection.getUniqueId('roster'),
                iq = $iq({
                    type: 'get',
                    to: obj.jid,
                    id: requestId
                }).c('vCard', {
                    xmlns: Strophe.NS.VCARD
                }).tree();

            sharedData.connection.sendIQ(iq, obj.callback);
        }
    }
});