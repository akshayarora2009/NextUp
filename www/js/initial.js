
$(function(){


$("#branch").chained("#year");
$("#group").chained("#year, #branch");

if(localStorage.overAllCode === undefined)
{
	
   $('#go').click(function(event){
	
	var year=$('#year').val();
	//alert(typeof year);
	//alert(year);
	
	var branch=$('#branch').val();
	//alert(branch);

	var group=$('#group').val();
	//alert(group);
	var status=year+branch;
	
	//localStorage.code=status;


	localStorage.yearCode=year;
	localStorage.branchCode=branch;
	localStorage.groupCode=group;

	localStorage.overAllCode=true;

	window.location.href="listings.html";


    });


}

else
{

window.location.href="listings.html";

}
});