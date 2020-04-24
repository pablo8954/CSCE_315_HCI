function ajaxCall() {
    this.send = function(data, url, method, success, type) {
        type = type||'json';
        var successRes = function(data) {
            success(data);
        }

        var errorRes = function(e) {
            console.log(e);
            //alert("Error found \nError Code: "+e.status+" \nError Message: "+e.statusText);
            //jQuery('#loader').modal('hide');
        }
        jQuery.ajax({
            url: url,
            type: method,
            data: data,
            success: successRes,
            error: errorRes,
            dataType: type,
            timeout: 60000
        });

    }

}

function locationInfo() {
    var rootUrl = "//geodata.solutions/api/api.php";
    //set default values
    var username = 'demo';
    var ordering = 'name';
    //now check for set values
    var addParams = '';
    if(jQuery("#gds_appid").length > 0) {
        addParams += '&appid=' + jQuery("#gds_appid").val();
    }
    if(jQuery("#gds_hash").length > 0) {
        addParams += '&hash=' + jQuery("#gds_hash").val();
    }

    var call = new ajaxCall();

    this.confCity = function(id) {
     //   console.log(id);
     //   console.log('started');
        var url = rootUrl+'?type=confCity&countryId='+ jQuery('#countrySrcId option:selected').attr('countrySrcid') +'&stateId=' + jQuery('#stateSrcId option:selected').attr('stateSrcid') + '&cityId=' + id;
        var method = "post";
        var data = {};
        call.send(data, url, method, function(data) {
            if(data){
                //    alert(data);
                //    alert("HERE");
            }
            else{
                //   alert('No data');
            }
        });
    };


    this.getCities = function(id) {
        jQuery(".citiesSrc option:gt(0)").remove();
        //get additional fields
        var stateClasses = jQuery('#citySrcId').attr('class');

        var cC = stateClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }
        var url = rootUrl+'?type=getCities&countryId='+ jQuery('#countrySrcId option:selected').attr('countrySrcid') +'&stateId=' + id + addParams + addClasses;
        var method = "post";
        var data = {};
        jQuery('.citiesSrc').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.citiesSrc').find("option:eq(0)").html("Select City");
            if(data.tp == 1){
                if(data.hits > 1000)
                {
                    //alert('Free usage far exceeded. Please subscribe at geodata.solutions.');
                    console.log('Daily geodata.solutions request limit exceeded count:' + data.hits + ' of 1000');
                }
                else
                {
                    console.log('Daily geodata.solutions request count:' + data.hits + ' of 1000')
                }

                var listlen = Object.keys(data['result']).length;

                if(listlen > 0)
                {
                    jQuery.each(data['result'], function(key, val) {

                        var option = jQuery('<option />');
                        option.attr('value', val).text(val);
                        jQuery('.citiesSrc').append(option);
                    });
                }
                else
                {
                    var usestate = jQuery('#stateSrcId option:selected').val();
                    var option = jQuery('<option />');
                    option.attr('value', usestate).text(usestate);
                    option.attr('selected', 'selected');
                    jQuery('.citiesSrc').append(option);
                }

                jQuery(".citiesSrc").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

    this.getStates = function(id) {
        jQuery(".statesSrc option:gt(0)").remove();
        jQuery(".citiesSrc option:gt(0)").remove();
        //get additional fields
        var stateClasses = jQuery('#stateSrcId').attr('class');

        var cC = stateClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }
        var url = rootUrl+'?type=getStates&countryId=' + id + addParams  + addClasses;
        var method = "post";
        var data = {};
        jQuery('.statesSrc').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.statesSrc').find("option:eq(0)").html("Select State");
            if(data.tp == 1){
                if(data.hits > 1000)
                {
                    //alert('Free usage far exceeded. Please subscribe at geodata.solutions.');
                    console.log('Daily geodata.solutions request limit exceeded:' + data.hits + ' of 1000');
                }
                else
                {
                    console.log('Daily geodata.solutions request count:' + data.hits + ' of 1000')
                }
                jQuery.each(data['result'], function(key, val) {
                    var option = jQuery('<option />');
                    option.attr('value', val).text(val);
                    option.attr('stateSrcid', key);
                    jQuery('.statesSrc').append(option);
                });
                jQuery(".statesSrc").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

    this.getCountries = function() {
        //get additional fields
        var countryClasses = jQuery('#countrySrcId').attr('class');

        var cC = countryClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }

        var presel = false;
        var iip = 'N';
        jQuery.each(cC, function( index, value ) {
            if (value.match("^presel-")) {
                presel = value.substring(7);

            }
            if(value.match("^presel-byi"))
            {
                var iip = 'Y';
            }
        });


        var url = rootUrl+'?type=getCountries' + addParams + addClasses;
        var method = "post";
        var data = {};
        jQuery('.countriesSrc').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.countriesSrc').find("option:eq(0)").html("Select Country");

            if(data.tp == 1){
                if(data.hits > 1000)
                {
                    //alert('Free usage far exceeded. Please subscribe at geodata.solutions.');
                    console.log('Daily geodata.solutions request limit exceeded:' + data.hits + ' of 1000');
                }
                else
                {
                    console.log('Daily geodata.solutions request count:' + data.hits + ' of 1000')
                }
                if(presel == 'byip')
                {
                    presel = data['presel'];
                    console.log('2 presel is set as ' + presel);
                }


                if(jQuery.inArray("group-continents",cC) > -1)
                {
                    var $select = jQuery('.countriesSrc');
                    console.log(data['result']);
                    jQuery.each(data['result'], function(i, optgroups) {
                        var $optgroup = jQuery("<optgroup>", {label: i});
                        if(optgroups.length > 0)
                        {
                            $optgroup.appendTo($select);
                        }

                        jQuery.each(optgroups, function(groupName, options) {
                            var coption = jQuery('<option />');
                            coption.attr('value', options.name).text(options.name);
                            coption.attr('countrySrcid', options.id);
                            if(presel) {
                                if (presel.toUpperCase() == options.id) {
                                    coption.attr('selected', 'selected');
                                }
                            }
                            coption.appendTo($optgroup);
                        });
                    });
                }
                else
                {
                    jQuery.each(data['result'], function(key, val) {
                        var option = jQuery('<option />');
                        option.attr('value', val).text(val);
                        option.attr('countrySrcid', key);
                        if(presel)
                        {
                            if(presel.toUpperCase() ==  key)
                            {
                                option.attr('selected', 'selected');
                            }
                        }
                        jQuery('.countriesSrc').append(option);
                    });
                }
                if(presel)
                {
                    jQuery('.countriesSrc').trigger('change');
                }
                jQuery(".countriesSrc").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

}

/**  DESTINATION CODE **/
function locationDesInfo() {
    var rootUrl = "//geodata.solutions/api/api.php";
    //set default values
    var username = 'demo';
    var ordering = 'name';
    //now check for set values
    var addParams = '';
    if(jQuery("#gds_appid").length > 0) {
        addParams += '&appid=' + jQuery("#gds_appid").val();
    }
    if(jQuery("#gds_hash").length > 0) {
        addParams += '&hash=' + jQuery("#gds_hash").val();
    }

    var call = new ajaxCall();

    this.confCityDes = function(id) {
     //   console.log(id);
     //   console.log('started');
        var url = rootUrl+'?type=confCity&countryId='+ jQuery('#countryDesId option:selected').attr('countryDesid') +'&stateId=' + jQuery('#stateDesId option:selected').attr('stateDesid') + '&cityId=' + id;
        var method = "post";
        var data = {};
        call.send(data, url, method, function(data) {
            if(data){
                //    alert(data);
                //    alert("HERE");
            }
            else{
                //   alert('No data');
            }
        });
    };


    this.getCitiesDes = function(id) {
        jQuery(".citiesDes option:gt(0)").remove();
        //get additional fields
        var stateClasses = jQuery('#cityDesId').attr('class');

        var cC = stateClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }
        var url = rootUrl+'?type=getCities&countryId='+ jQuery('#countryDesId option:selected').attr('countryDesid') +'&stateId=' + id + addParams + addClasses;
        var method = "post";
        var data = {};
        jQuery('.citiesDes').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.citiesDes').find("option:eq(0)").html("Select City");
            if(data.tp == 1){
                if(data.hits > 1000)
                {
                    //alert('Free usage far exceeded. Please subscribe at geodata.solutions.');
                    console.log('Daily geodata.solutions request limit exceeded count:' + data.hits + ' of 1000');
                }
                else
                {
                    console.log('Daily geodata.solutions request count:' + data.hits + ' of 1000')
                }

                var listlen = Object.keys(data['result']).length;

                if(listlen > 0)
                {
                    jQuery.each(data['result'], function(key, val) {

                        var option = jQuery('<option />');
                        option.attr('value', val).text(val);
                        jQuery('.citiesDes').append(option);
                    });
                }
                else
                {
                    var usestate = jQuery('#stateDesId option:selected').val();
                    var option = jQuery('<option />');
                    option.attr('value', usestate).text(usestate);
                    option.attr('selected', 'selected');
                    jQuery('.citiesDes').append(option);
                }

                jQuery(".citiesDes").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

    this.getStatesDes = function(id) {
        jQuery(".statesDes option:gt(0)").remove();
        jQuery(".citiesDes option:gt(0)").remove();
        //get additional fields
        var stateClasses = jQuery('#stateDesId').attr('class');

        var cC = stateClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }
        var url = rootUrl+'?type=getStates&countryId=' + id + addParams  + addClasses;
        var method = "post";
        var data = {};
        jQuery('.statesDes').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.statesDes').find("option:eq(0)").html("Select State");
            if(data.tp == 1){
                if(data.hits > 1000)
                {
                    //alert('Free usage far exceeded. Please subscribe at geodata.solutions.');
                    console.log('Daily geodata.solutions request limit exceeded:' + data.hits + ' of 1000');
                }
                else
                {
                    console.log('Daily geodata.solutions request count:' + data.hits + ' of 1000')
                }
                jQuery.each(data['result'], function(key, val) {
                    var option = jQuery('<option />');
                    option.attr('value', val).text(val);
                    option.attr('stateDesid', key);
                    jQuery('.statesDes').append(option);
                });
                jQuery(".statesDes").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

    this.getCountriesDes = function() {
        //get additional fields
        var countryClasses = jQuery('#countryDesId').attr('class');

        var cC = countryClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }

        var presel = false;
        var iip = 'N';
        jQuery.each(cC, function( index, value ) {
            if (value.match("^presel-")) {
                presel = value.substring(7);

            }
            if(value.match("^presel-byi"))
            {
                var iip = 'Y';
            }
        });


        var url = rootUrl+'?type=getCountries' + addParams + addClasses;
        var method = "post";
        var data = {};
        jQuery('.countriesDes').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.countriesDes').find("option:eq(0)").html("Select Country");

            if(data.tp == 1){
                if(data.hits > 1000)
                {
                    //alert('Free usage far exceeded. Please subscribe at geodata.solutions.');
                    console.log('Daily geodata.solutions request limit exceeded:' + data.hits + ' of 1000');
                }
                else
                {
                    console.log('Daily geodata.solutions request count:' + data.hits + ' of 1000')
                }
                if(presel == 'byip')
                {
                    presel = data['presel'];
                    console.log('2 presel is set as ' + presel);
                }


                if(jQuery.inArray("group-continents",cC) > -1)
                {
                    var $select = jQuery('.countriesDes');
                    console.log(data['result']);
                    jQuery.each(data['result'], function(i, optgroups) {
                        var $optgroup = jQuery("<optgroup>", {label: i});
                        if(optgroups.length > 0)
                        {
                            $optgroup.appendTo($select);
                        }

                        jQuery.each(optgroups, function(groupName, options) {
                            var coption = jQuery('<option />');
                            coption.attr('value', options.name).text(options.name);
                            coption.attr('countryDesid', options.id);
                            if(presel) {
                                if (presel.toUpperCase() == options.id) {
                                    coption.attr('selected', 'selected');
                                }
                            }
                            coption.appendTo($optgroup);
                        });
                    });
                }
                else
                {
                    jQuery.each(data['result'], function(key, val) {
                        var option = jQuery('<option />');
                        option.attr('value', val).text(val);
                        option.attr('countryDesid', key);
                        if(presel)
                        {
                            if(presel.toUpperCase() ==  key)
                            {
                                option.attr('selected', 'selected');
                            }
                        }
                        jQuery('.countriesDes').append(option);
                    });
                }
                if(presel)
                {
                    jQuery('.countriesDes').trigger('change');
                }
                jQuery(".countriesDes").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

}

/* MAIN */
jQuery(function() {
    //Source Travel Code
    var loc = new locationInfo();
    loc.getCountries();

    //Destination Code
    var locDes = new locationDesInfo();
    locDes.getCountriesDes();

    jQuery(".countriesSrc").on("change", function(ev) {
        var countryId = jQuery("option:selected", this).attr('countrySrcid');
        if(countryId != ''){
            loc.getStates(countryId);
        }
        else{
            jQuery(".statesSrc option:gt(0)").remove();
        }
    });
    jQuery(".statesSrc").on("change", function(ev) {
        var stateId = jQuery("option:selected", this).attr('stateSrcid');
        if(stateId != ''){
            loc.getCities(stateId);
        }
        else{
            jQuery(".citiesSrc option:gt(0)").remove();
        }
    });

    jQuery(".citiesSrc").on("change", function(ev) {
        var cityId = jQuery("option:selected", this).val();
        if(cityId != ''){
            loc.confCity(cityId);
        }
    });


    jQuery(".countriesDes").on("change", function(ev) {
        var countryId = jQuery("option:selected", this).attr('countryDesid');
        if(countryId != ''){
            locDes.getStatesDes(countryId);
        }
        else{
            jQuery(".statesDes option:gt(0)").remove();
        }
    });
    jQuery(".statesDes").on("change", function(ev) {
        var stateId = jQuery("option:selected", this).attr('stateDesid');
        if(stateId != ''){
            locDes.getCitiesDes(stateId);
        }
        else{
            jQuery(".citiesDes option:gt(0)").remove();
        }
    });

    jQuery(".citiesDes").on("change", function(ev) {
        var cityId = jQuery("option:selected", this).val();
        if(cityId != ''){
            locDes.confCityDes(cityId);
        }
    });



});
