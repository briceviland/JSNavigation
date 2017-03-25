/*
 * JSNavigation 1.0.0
 * (c) 2017 Brice Viland
 * licensed under MIT
 */

(function ( $ ) {

    /*
        Settings
    */
    var settings = {
        fontColor: "#e6e6e6",
        fontColorHovered: "",
        fontSize : '15px',
        backgroundColor: "#000",
        backgroundColorHovered: 'initial',
        paddingVertical: '20px',
        paddingHorizontal: '10px',
        borderSize: '0px',
        paddingVerticalSubMenu: '10px',
        paddingHorizontalSubMenu: '5px',
        borderColor: '#fff'
    };
    /*
        End Settings
    */
 
    /*
        Create Plugin
    */
    $.fn.navigation = function( options ) {
        // Store settings from user
        settings = $.extend( {}, settings, options );

        // Create Variables
        var ul = this.find('ul');
        var li = this.find('li');
        var a = this.find('a');
        var subMenu = this.find('.sub-menu');
        var clear = $('<li class="navigation-clear"></li>');
        
        // Define CSS and adjust sub menus
        defineCSS(ul, li, a, clear);
        adjustSubMenus(subMenu);

        // Add clear to all lists
        clear.appendTo(ul);

        // Call Menu Events
        li.hover(function(){
            menuHover($(this));
        },
        function(){
            menuNotHovered($(this));
        });
    };
    /*
        End Create Plugin
    */

    function defineCSS(ul, li, a, clear){
        ul.css({
            'padding' : '0',
            'border-style' : 'solid',
            'border-color' : settings.borderColor,
            'border-width' : settings.borderSize,
            'background-color' : settings.backgroundColor,
            'font-size' : settings.fontSize,
            'margin' : '0'
        })

        li.css({
            'float' : 'left',
            'list-style-type' : 'none'
        })

        a.css({
            'padding' : settings.paddingVertical + ' ' + settings.paddingHorizontal,
            'display' : 'block',
            'box-sizing' : 'border-box',
            'text-decoration' : 'none',
            'color' : settings.fontColor,
            'white-space' : 'nowrap'
        })
        clear.css({
            'clear' : 'left',
            'visibility' : 'hidden',
            'height' : '0',
            'width' : '0',
            'float' : 'none',
            'list-style-type' : 'none'
        });
    }

    /*
        Adjust Sub Menus
    */
    function adjustSubMenus(subMenus){
        subMenus.each(function( i ) {
            if($(this).parent().parent().hasClass('sub-menu')){
                adjustNestedSubMenu(this);
            }
            else {
                adjustFirstSubMenu(this);
            }
        })
    }
    function adjustFirstSubMenu(subMenu){
        $(subMenu).data('state', 'closed');
        $(subMenu).css({
            'display' : 'none',
            'position' : 'absolute',
            'background-color' : settings.backgroundColor
        })
        $(subMenu).find('li').css({
            'position' : 'relative',
            'float' : 'none'
        })
        $(subMenu).find('a').css({
            'padding' : settings.paddingVerticalSubMenu + ' ' + settings.paddingHorizontalSubMenu,
        })
    }
    function adjustNestedSubMenu(subMenu){
        $(subMenu).data('state', 'closed');
        $(subMenu).css({
            'display' : 'none',
            'left' : '100%',
            'display' : 'none',
            'position' : 'absolute',
            'background-color' : settings.backgroundColor
        })
        $(subMenu).find('li').css({
            'position' : 'relative',
            'float' : 'none'
        })
        $(subMenu).find('a').css({
            'padding' : settings.paddingVerticalSubMenu + ' ' + settings.paddingHorizontalSubMenu,
        })

        // Adjust sub menu parent link to show list item has a submenu
        var parentLink = $(subMenu).parent().find('a').first();
        editSubMenuParentLink(parentLink);
    }
    function editSubMenuParentLink(a) {
        $(a).append(' >')
    }
    /*
        End Adjust Sub Menus
    */

    /*
        Menu Events
    */
    function menuHover(li){
        var subMenu = li.find('.sub-menu').first()
        li.addClass('nav-menu-hovered');
        li.css({
            'background-color': settings.backgroundColorHovered
        })
        li.find('a').first().css({
            'color' : settings.fontColorHovered
        })
        if(!$(subMenu).parent().parent().hasClass('sub-menu')){
            $(subMenu).css({
                'min-width' : $(subMenu).parent().css('width')
            });
        }
        if(li.parent().hasClass('sub-menu')){
            $(subMenu).css({
                top: '-' + settings.borderSize
            })
        }
        if($(subMenu).parent().parent().hasClass('sub-menu')){
            openNestedMenu(subMenu);
        }
        else {
            openFirstMenu(subMenu);
        }
    }
    function menuNotHovered(li){
        li.removeClass('nav-menu-hovered');
        li.css({
            'background-color': settings.backgroundColor
        })
        li.find('a').first().css({
            'color' : settings.fontColor
        })
        li.addClass('nav-menu-not-hovered');
        checkToCloseMenu();
    }
    function checkToCloseMenu(){
        $('.nav-menu-not-hovered').each(function( i ){
            var hovered = $(this).find('.nav-menu-hovered');
            if(!hovered.length){
                var subMenu = $(this).find('.sub-menu').first()
                $(this).removeClass('nav-menu-not-hovered');

                if($(subMenu).parent().parent().hasClass('sub-menu')){
                    closeNestedMenu(subMenu);
                }
                else {
                    closeFirstMenu(subMenu);
                }
            }
        });
    }
    function closeFirstMenu(Menu){
        if(Menu.data('state') == 'open'){
            $(Menu).slideUp(200, function(){Menu.data('state', 'closed')});
        }
    }
    function closeNestedMenu(Menu){
        $(Menu).css({
            display : 'none'
        });
        Menu.data('state', 'closed')
    }
    function openFirstMenu(Menu){
        if(Menu.data('state') == 'closed'){
            $(Menu).slideDown(200, function(){Menu.data('state', 'open')});
        }
    }
    function openNestedMenu(Menu){
        $(Menu).css({
            display : 'block'
        });
        Menu.data('state', 'open')
    }
    /*
        End Menu Events
    */
}( jQuery ));
