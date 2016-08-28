/**
 * Created by Administrator on 09/28/2015.
 */
var dns = require('dns');

dns.lookup('www.baidu.com', function onLookup(err, addresses, family) {
    console.log('addresses:', addresses);
    console.log('family:',family);
});


dns.resolve('www.baidu.com', function (err, addresses) {
    if (err) throw err;
    console.log('addresses: ' + JSON.stringify(addresses));
    addresses.forEach(function (a) {
        dns.reverse(a, function (err, hostnames) {
            if (err) {
                throw err;
            }
            console.log('reverse for ' + a + ': ' + JSON.stringify(hostnames));
        });
    });
});

dns.reverse('22.156.141.13', function (err, hostnames) {
    if (err) {
        throw err;
    }
    console.log('reverse for ' + a + ': ' + JSON.stringify(hostnames));
});
dns.getServers().forEach(function(val){
    console.log('current ip >>> '+val);
});
// console.log(dns.getServers());