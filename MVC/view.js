var View = {
    render: function(templateName, model) {
        templateName = templateName + 'Template';

        var templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);
        // console.log(templateName,'model',model);
        return renderFn(model);
    }
};
