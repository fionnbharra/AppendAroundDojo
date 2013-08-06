 define([
  "dojo/query",
  "dojo/dom-style",
  "dojo/_base/array",
  "dojo/dom-attr",
  "dojo/on",
  'dojo/NodeList-traverse'
 ], function(query, domStyle, dojoArray, domAttr, on) {

      return {

        appendAround: function(node) {

          var $self = query(node),
              att = "data-set",
              $parent = $self.parent(),
              parent = $parent[ 0 ],
              attval = domAttr.get( parent, att ),
              $set = query( "["+ att +"='" + attval + "']" );

          function isHidden( elem ){
            return window.getComputedStyle( elem ,null).getPropertyValue( "display" ) === "none";
          }

          function appendToVisibleContainer(){
            if( isHidden( parent ) ){
              var found = 0;
              $set.forEach(function(node, index, arr){
                if( !isHidden( node ) && !found ){
                  $self.appendTo( node );
                  found++;
                  parent = node;
                }
              });
            }
          }

          appendToVisibleContainer();

          on(window, "resize", appendToVisibleContainer );

        }
      };
});