/**
 * Created by JeromeGao on 5/30/16.
 */

/**
 * 模版：
   <div id="banks_select" class="select_mock_wrap">
        <input type="hidden" name="banks_select" class="select_mock_value" value="" />
        <div class="select_cur_area">
            <div class="select_cur_content">
                选择开户银行
            </div>
            <div class="select_arr">
            </div>
        </div>

        <ul class="select_mock_contents">
            <c:forEach items="${Banks}" var="bank" begin="0" step="1" >
                <c:if test="${bank.canDebug}">
                    <li value="${bank.value}">${bank.desc}</li>
                </c:if>
            </c:forEach>
        </ul>
    </div>
 * 调用，根据select wrap id 初始化select： mockSelect.initSelect("banks_select");
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["jquery"], function(jquery) {
            return factory(root, jquery);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.MockSelect = factory(root, jQuery || document);
    }
})(this, function(root, $) {
    'use strict';

    var MockSelect = {
        initSelect: function(wrapId) {
            var $wrap = $("#" + wrapId);
            if ($wrap.length > 0) {
                var selectCurArea = $wrap.find(".select_cur_area"),
                    selectCurContent = $wrap.find(".select_cur_content"),
                    selectMockContents = $wrap.find(".select_mock_contents"),
                    selectArr = $wrap.find(".select_arr");

                selectCurArea.on("click", function() {
                    if (selectMockContents.css("display") == "none") {
                        selectMockContents.show();
                        selectArr.addClass("open");
                    } else {
                        selectArr.removeClass("open");
                        selectMockContents.hide();
                    }
                });

                selectMockContents.on("click", "li", function(evt) {
                    var $li = $(this);
                    var obj = this;
                    var value = obj.getAttribute("value");

                    selectMockContents
                      .find('li')
                        .attr('aria-status', 'normal');

                    $li.attr('aria-status', 'active');

                    $wrap.find(".select_mock_value").val(value);
                    $wrap.find(".select_mock_desc").val(obj.innerText);
                    $wrap.find(".select_mock_value").blur();
                    selectCurContent.text(obj.innerText);

                    selectCurContent.addClass("val");
                    selectMockContents.hide();
                    selectArr.removeClass("open");
                });

                var selectMockValue = $wrap.find(".select_mock_value").val();
                if(selectMockValue){
                    $wrap.find("li[value=" + selectMockValue + "]").click();
                }

            } else {
                console.log("没有" + wrapId);
            }
        }
    };
    return MockSelect;
});
