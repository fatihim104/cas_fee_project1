Handlebars.registerHelper('isEqual', function(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('LightningIcon', function(importance) {
    let icon = '';
    for (let i = 0; i < importance; i++) {
      icon += '&#x26A1;'; 
    }
    return icon;
});

Handlebars.registerHelper('daysRemaining', function(dueDate) {
    const currentDate = moment(); 
    const remainingDays = moment(dueDate).diff(currentDate, 'days'); 
    
    return remainingDays === 0 ? ' in a day' : remainingDays + ' days';
});