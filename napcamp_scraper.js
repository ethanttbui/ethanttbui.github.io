const campsiteIds = [12187, 10789, 14528, 12252]
const startDate = "2021-6-28"
const endDate = "2021-6-29"

$(document).ready(function(){

	$("#container").on("click", ".collapsible", function () {
		$(this).toggleClass("active")
		var content = this.nextElementSibling;
		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block";
		}
	})

	for (id of campsiteIds) {
		(function(id) {
			$.get(`https://www.nap-camp.com/api/campsite/${id}`, function (campsite) {
				$("#container").append(
					`<button type="button" class="collapsible">${campsite.name}</button>`,
					`<div id="${id}" class="content">`,
					`</div><br/><br/>`
				)

				var planSearchUrl = `https://www.nap-camp.com/api/campsite/${id}/plans?check_in=${startDate}&check_out=${endDate}`
				$.get(planSearchUrl, function (plans) {
					for (const plan of plans.list) {
						var planDetailUrl = `https://www.nap-camp.com/${campsite.prefecture_name_en}/${id}/plans/${plan.id}`
						$(`#${id}`).append(
							`<p> Plan: ${plan.site_name} - Price: ${plan.price.guideline} - <a href="${planDetailUrl}">See in nap-camp</a></p>`
						)
					}
				})
			})
		}(id))
	}

})