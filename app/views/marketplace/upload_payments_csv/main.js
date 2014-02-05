Balanced.MarketplaceUploadPaymentsCsvView = Balanced.View.extend({

	creditCreators: Ember.computed.alias("controller.creditCreators"),

	displayCsvRows: Ember.computed.and("creditCreators.hasItems", "isEscrowValid"),

	unprocessableTotal: Balanced.computed.sum("unprocessableRows", "credit.amount"),
	payoutTotal: Balanced.computed.sum("processableRows", "credit.amount"),

	isEscrowValid: function() {
		var total = this.get("payoutTotal");
		var escrow = this.get("escrowTotal");
		return total <= escrow;
	}.property("payoutTotal", "escrowTotal"),

	escrowTotal: Ember.computed.alias("controller.controllers.marketplace.in_escrow"),

	isProcessable: Ember.computed.and("isEscrowValid", "isAllValid"),
	isUnprocessable: Ember.computed.not("isProcessable"),

	validRows: Ember.computed.filter('creditCreators', function(creator) {
		return creator.isValid();
	}),

	invalidRows: Ember.computed.filter('creditCreators', function(creator) {
		return !creator.isValid();
	}),

	unprocessableRows: Balanced.computed.filterEach("invalidRows.@each.isRemoved", "invalidRows", function(creator) {
		return !creator.get("isRemoved");
	}),

	processableRows: Balanced.computed.filterEach("creditCreators.@each.isRemoved", "creditCreators", function(creator) {
		return !creator.get("isRemoved");
	}),

	activeRows: Balanced.computed.filterEach("creditCreators.@each.isActive", "creditCreators", function(creator) {
		return creator.get("isActive");
	}),

	isAllValid: function() {
		return this.get("invalidRows").every(function(creator) {
			return creator.get("isRemoved");
		});
	}.property("invalidRows.@each.isRemoved"),

	updateReaderBody: function(text) {
		this.get("controller").refresh(text);
	},

	updateProgressFraction: function() {
		var completedRows = this.get("creditCreators").filter(function(creator) {
			return creator.get("isComplete");
		});
		var validLength = this.get("creditCreators.valid.length");

		var fraction = completedRows.length / validLength;
		var text = "" + completedRows.length + "/" + validLength;

		this.get("progressBarModal").update(fraction, text);
	}.observes("creditCreators.@each.isComplete"),

	actions: {
		reset: function() {
			this.updateReaderBody(undefined);
		},

		submit: function() {
			var modal = this.get("progressBarModal");
			modal.send("open");
			modal.update(0);

			this.get("controller").save(function () {
				modal.send("close");
			});
		},

		fileSelectionChanged: function() {
			var self = this;
			var file = event.target.files[0];
			var reader = new FileReader();
			reader.onload = function(event) {
				var text = event.target.result;
				self.updateReaderBody(text);
			};
			reader.readAsText(file);
		}
	}
});
