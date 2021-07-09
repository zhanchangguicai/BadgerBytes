// Being used in admin_control.html

let id_print_usage_dropdown = "print_usage_dropdown";
let id_print_button = "print_button";

let print_usage_dropown = document.getElementById(id_print_usage_dropdown);
let print_button = document.getElementById(id_print_button);

print_button.onclick=function(){
    let day = "today", week = "this week", month = "this month", year = "this year";
    let now = get_now_date_object();
    switch (print_usage_dropown.value) {
        default:
            return compile_usage_data_for_last_x_days(1);

        case week:
            return compile_usage_data_for_last_x_days(now.getDay() + 1); // todo: do we add 1 here?

        case month:
            return compile_usage_data_for_last_x_days(now.getDate() + 1);

        case year:
            return compile_usage_data_for_last_x_days(get_day_of_year(now));
    }
}

function get_now_date_object() {
    return new Date();
}

function compile_usage_data_for_last_x_days(days_to_compile_data_for) {
    const orders = firebase.database().ref('orders');
    const query = orders.orderByKey();

    query.once('value', (snapshot) => {
        orders_to_track = []
        snapshot.forEach((order) => {
            order_object = order.val();
            
            if (is_order_within_days(order_object, days_to_compile_data_for)) {
                orders_to_track.push(order_object);
            }

        });
        print(orders_to_track);
    });
}

function get_day_of_year(date) {
    var start_of_year = new Date(date.getFullYear(), 0, 0);
    var days_between = days_between(start_of_year, date);
    return days_between + 1;
}

function is_order_within_days(order_object, days) {
    order_date = new Date(order_object.time.year, order_object.time.month - 1, order_object.time.day);
    return Boolean(days_between(order_date, get_now_date_object()) <=days);
}

function days_between(start_date, end_date) {
  // The number of milliseconds in all UTC days (no DST)
  const one_day = 1000 * 60 * 60 * 24;

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(end_date.getFullYear(), end_date.getMonth(), end_date.getDate());
  const end = Date.UTC(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());

  // so it's safe to divide by 24 hours
  return (start - end) / one_day;
}

function print(order_objects) {
    data = make_pretty(order_objects);
    //console.log(data)
    const doc = new jsPDF();
    doc.text(data, 10, 10);
    doc.save("usage_report.pdf");
    //window.open(doc.output('datauristring'));
}

function make_pretty(order_objects) {
    let divider_string = '-'.repeat(55);
    let header = "Serial no.\t  Date\t\t\t Price" + "\n" + divider_string;
    let array_of_each_item = [header];
    let serial_number = 1;
    order_objects.forEach(function (order_object) {
        array_of_each_item.push(get_printable_string_for_order(order_object, serial_number))
        serial_number++;
    });
    footer = divider_string + "\n";
    footer+=`Total` + ' '.repeat(46) + `$${get_total_price_for_all(order_objects)}`;
    array_of_each_item.push(footer);
    return array_of_each_item.join('\n')
}

function get_printable_string_for_order(order_object, serial_number) {
    return `${serial_number}\t\t\t${get_printable_date(order_object)}\t\t$${order_object.totalPrice}`
}

function get_printable_date(order_object) {
    return `${order_object.time.month}/${order_object.time.day}/${order_object.time.year}`
}

function get_total_price_for_all(order_objects) {
    count = 0;
    order_objects.forEach(order_object => {
        count+= order_object.totalPrice;
    });
    return count;
}