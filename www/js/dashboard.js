
var servaddr = 'http://altmine.co:4444';

$(document).ajaxError(function(event, request, settings, err) {
        alert("error: " + settings.url + ": " + err.message);
});

/**
 * Get the current rate
 */
$.get(servaddr + '/rate', function(data) {
        $('#hashrate').html(data / 1000000000);
});

/**
 * Get the currency_info
 */
$.get(servaddr + '/web/currency_info', function(currency_info) {
    $('#currency').html('<img src="img/graphics/coins/'+currency_info.symbol+'.png" alt="'+currency_info.symbol+'" width="100%" />');
});

/**
 * Get the current_payouts

$.getJSON(servaddr + '/current_payouts', function(pays) {
        var arr = new Array;
        var total = 0;
        for(var i in pays) {
                arr.push(i);
        }
        arr.sort(function(a, b) { return (pays[b] - pays[a]); });
        for(var j in arr) {
                var addr = arr[j];
                addr = addr.replace(/^.*: /, "");
                $('#payouts tr:last').after('<tr><td><a href="http://blockexplorer.com/address/' + addr + '">' + arr[j] + '</a></td><td>' +
                        pays[arr[j]] + '</td></tr>');
                total += pays[arr[j]];
        }
        $('#payouts tr:last').after('<tr><td><b>Total:</b></td><td><b>' + total.toFixed(8) + '</b></td></tr>');
}); */


/**
 * Get the recent blocks founds
 */
$.getJSON(servaddr + '/recent_blocks', function(blocks) {
        for(var i in blocks) {
                var ts = new Date(1000 * blocks[i]['ts']);
                var padded_hash = blocks[i]['hash'];
                while(padded_hash.length < 64) {
                        padded_hash = '0' + padded_hash;
                }
                $('#blocks tr:last').after('<tr><td>' + ts.toString() + 
                        '</td><td><a href="http://blockexplorer.com/block/'
                        + padded_hash + '">' + padded_hash + '</a></td></tr>');
        }
});