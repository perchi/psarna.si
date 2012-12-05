
// I control the primary navigation and the corresponding view of content that 
// is displayed on the page. I do not control the content that is displayed within 
// the primary content view (that is delegated to the other controllers).

// Add a controller to the application.
window.application.addController((function ($, application) {

    // I am the controller class.
    function Controller() {
        // Route URL events to the controller's event handlers.
        this.route("/", this.index);
        this.route("/default", this.index);
        this.route("/404", this.pageNotFound);

        // Set default properties.
        this.defaultViewUrl = null;
        this.pageNotFoundUrl = null;
    };

    // Extend the core application controller (REQUIRED).
    Controller.prototype = new application.Controller();


    // I initialize the controller. I get called once the application starts
    // running (or when the controller is registered - if the application is 
    // already running). At that point, the DOM is available and all the other 
    // model and view classes will have been added to the system.
    Controller.prototype.init = function () {
        this.defaultViewUrl = "MVC/Views/Default.html";
        this.pageNotFoundUrl = "MVC/Views/404.html";
    };


    // ----------------------------------------------------------------------- //
    // ----------------------------------------------------------------------- //


    // I am the default event for this controller.
    Controller.prototype.index = function (event) {
        this.showView(this.defaultViewUrl, null);
    };

    // I show the page not found view.
    Controller.prototype.pageNotFound = function (event) {
        this.showView(this.pageNotFoundUrl, null);
    };

    // I show the given view; but first, I hide any existing view.
    Controller.prototype.showView = function (viewUrl, data) {
        $.render({
            url: viewUrl,
            templateData: data,
            success: function (rendered) {
                $("#frontpad").html(rendered);
            }
        });
    };


    // ----------------------------------------------------------------------- //
    // ----------------------------------------------------------------------- //

    // Return a new contoller singleton instance.
    return (new Controller());

})(jQuery, window.application));
