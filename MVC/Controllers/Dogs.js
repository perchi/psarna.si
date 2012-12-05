
// I control the events within the Contacts section of the application.

// Add a controller to the application.
window.application.addController((function ($, application) {

    // I am the controller class.
    function Controller() {
        // Route URL events to the controller's event handlers.
        this.route("/dogs/:id", this.getDog);

        // Set default properties.
        this.detailsViewUrl = null;
    };

    // Extend the core application controller (REQUIRED).
    Controller.prototype = new application.Controller();


    // I initialize the controller. I get called once the application starts
    // running (or when the controller is registered - if the application is 
    // already running). At that point, the DOM is available and all the other 
    // model and view classes will have been added to the system.
    Controller.prototype.init = function () {
        this.detailsViewUrl = "MVC/Views/Dog.html";
    };


    // ----------------------------------------------------------------------- //
    // ----------------------------------------------------------------------- //

    // I am the edit event for this controller.
    Controller.prototype.getDog = function (event, id) {
        var self = this;
        $.getJSON("API/dogs.json.txt", function (data) {
            for (var i = 0; i < data.data.length; i++) {
                var dog = data.data[i];
                if (dog.id.toString() == id) {
                    self.showView(self.detailsViewUrl, dog);
                    break;
                }
            }
        });
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
