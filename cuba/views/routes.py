from flask import Flask, render_template, redirect, flash, Blueprint, request, session
from flask_login import login_required
from cuba.extends import db
from cuba.models import *

main = Blueprint('main', __name__)


# 上下文处理器
@main.context_processor
def inject_user_info():
    userHead = session.get('userHead')
    username = session.get('username')
    isAdmin = session.get('admin')
    return dict(username=username, isAdmin=isAdmin, userHead=userHead)

# Create your views here.

# -------------------------General(Dashboards,Widgets & Layout)---------------------------------------

# ---------------Dashboards
@main.route('/')
@main.route('/default')
@login_required
def index():
    context = {"breadcrumb": {"parent": "面板切换", "child": "主界面", "jsFunction": 'startTime()'}}
    return render_template("general/dashboard/default/index.html", **context)


@main.route('/workTasks')
@login_required
def online_course():
    context = {"breadcrumb": {"parent": "面板切换", "child": "工作任务"}}
    return render_template("general/dashboard/online-course/online-course.html", **context)


# ----------------Widgets
@main.route('/general_widget')
@login_required
def general_widget():
    context = {"breadcrumb": {"parent": "Widgets", "child": "General"}}
    return render_template("general/widget/general-widget/general-widget.html", **context)


@main.route('/chart_widget')
@login_required
def chart_widget():
    context = {"breadcrumb": {"parent": "Widgets", "child": "Chart"}}
    return render_template("general/widget/chart-widget/chart-widget.html", **context)


# #-----------------Layout
@main.route('/box_layout')
@login_required
def box_layout():
    context = {'layout': 'box-layout', "breadcrumb": {"parent": "Page Layout", "child": "Box Layout"}}
    return render_template("general/page-layout/box-layout.html", **context)


@main.route('/layout_rtl')
@login_required
def layout_rtl():
    context = {'layout': 'rtl', "breadcrumb": {"parent": "Page Layout", "child": "RTL"}}
    return render_template("general/page-layout/layout-rtl.html", **context)


@main.route('/layout_dark')
@login_required
def layout_dark():
    context = {'layout': 'dark-only', "breadcrumb": {"parent": "Page Layout", "child": "Layout Dark"}}
    return render_template("general/page-layout/layout-dark.html", **context)


@main.route('/hide_on_scroll')
@login_required
def hide_on_scroll():
    context = {"breadcrumb": {"parent": "Page Layout", "child": "Hide Menu On Scroll"}}
    return render_template("general/page-layout/hide-on-scroll.html", **context)


@main.route('/footer_light')
@login_required
def footer_light():
    context = {"breadcrumb": {"parent": "Page Layout", "child": "footer light"}}
    return render_template("general/page-layout/footer-light.html", **context)


@main.route('/footer_dark')
@login_required
def footer_dark():
    context = {"footer": "footer-dark", "breadcrumb": {"parent": "Page Layout", "child": "footer dark"}}
    return render_template("general/page-layout/footer-dark.html", **context)


@main.route('/footer_fixed')
@login_required
def footer_fixed():
    context = {"footer": "footer-fix", "breadcrumb": {"parent": "Page Layout", "child": "footer fixed"}}
    return render_template("general/page-layout/footer-fixed.html", **context)


# --------------------------------Applications---------------------------------

# ---------------------Project
@main.route('/projects')
@login_required
def projects():
    context = {"breadcrumb": {"parent": "Apps", "child": "Project List"}}
    return render_template("applications/projects/projects-list/projects.html", **context)


@main.route('/projectcreate')
@login_required
def projectcreate():
    context = {"breadcrumb": {"parent": "Apps", "child": "Project Create"}}
    return render_template("applications/projects/projectcreate/projectcreate.html", **context)


# -------------------File Manager
@main.route('/file_manager')
@login_required
def file_manager():
    context = {"breadcrumb": {"parent": "Apps", "child": "File Manager"}}
    return render_template("applications/file-manager/file-manager.html", **context)


# ------------------Kanban Board
@main.route('/kanban')
@login_required
def kanban():
    context = {"breadcrumb": {"parent": "Apps", "child": "Kanban Board"}}
    return render_template("applications/kanban/kanban.html", **context)


# --------------------ecommerce
@main.route('/product_cards')
@login_required
def product_cards():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Product"}}
    return render_template("applications/ecommerce/product/product.html", **context)


@main.route('/product_page')
@login_required
def product_page():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Product Page"}}
    return render_template("applications/ecommerce/product-page/product-page.html", **context)


@main.route('/list_products')
@login_required
def list_products():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Product List"}}
    return render_template("applications/ecommerce/list-products/list-products.html", **context)


@main.route('/payment_details')
@login_required
def payment_details():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Payment Details"}}
    return render_template("applications/ecommerce/payment-details/payment-details.html", **context)


@main.route('/order_history')
@login_required
def order_history():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Recent Orders"}}
    return render_template("applications/ecommerce/order-history/order-history.html", **context)


@main.route('/invoice_template')
@login_required
def invoice_template():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Invoice"}}
    return render_template("applications/ecommerce/invoice-template/invoice-template.html", **context)


@main.route('/cart')
@login_required
def cart():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Cart"}}
    return render_template("applications/ecommerce/cart/cart.html", **context)


@main.route('/list_wish')
@login_required
def list_wish():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Wishlist"}}
    return render_template("applications/ecommerce/list-wish/list-wish.html", **context)


@main.route('/checkout')
@login_required
def checkout():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Checkout"}}
    return render_template("applications/ecommerce/checkout/checkout.html", **context)


@main.route('/pricing')
@login_required
def pricing():
    context = {"breadcrumb": {"parent": "Ecommerce", "child": "Pricing"}}
    return render_template("applications/ecommerce/pricing/pricing.html", **context)


# --------------------------emails
@main.route('/email_application')
@login_required
def email_application():
    context = {"breadcrumb": {"parent": "Email", "child": "Email Application"}}
    return render_template("applications/email/email-application/email-application.html", **context)


@main.route('/email_compose')
@login_required
def email_compose():
    context = {"breadcrumb": {"parent": "Email", "child": "Email Compose"}}
    return render_template("applications/email/email-compose/email-compose.html", **context)


@main.route('/chat_app')
# --------------------------------chat
@login_required
def chat_app():
    context = {"breadcrumb": {"parent": "Chat", "child": "Chat App"}}
    return render_template("applications/chat/chat/chat.html", **context)


@main.route('/chat_video')
@login_required
def chat_video():
    context = {"breadcrumb": {"parent": "Chat", "child": "Video Chat"}}
    return render_template("applications/chat/chat-video/chat-video.html", **context)


@main.route('/user_profile')
# ---------------------------------user
@login_required
def user_profile():
    context = {"breadcrumb": {"parent": "Users", "child": "User Profile"}}
    return render_template("applications/user/user-profile/user-profile.html", **context)


@main.route('/edit_profile')
# @login_r@main.route('/dashboard_02')equired(login_url="/login_home")
def edit_profile():
    context = {"breadcrumb": {"parent": "Users", "child": "User Profile"}}
    return render_template("applications/user/edit-profile/edit-profile.html", **context)


@main.route('/user_cards')
@login_required
def user_cards():
    context = {"breadcrumb": {"parent": "Users", "child": "User Cards"}}
    return render_template("applications/user/user-cards/user-cards.html", **context)


# ------------------------bookmark
@main.route('/bookmark')
@login_required
def bookmark():
    context = {"breadcrumb": {"parent": "Apps", "child": "Bookmark"}}
    return render_template("applications/bookmark/bookmark.html", **context)


# ------------------------contacts
@main.route('/contacts')
@login_required
def contacts():
    context = {"breadcrumb": {"parent": "Apps", "child": "Contacts"}}
    return render_template("applications/contacts/contacts.html", **context)


# ------------------------task
@main.route('/task')
@login_required
def task():
    context = {"breadcrumb": {"parent": "Apps", "child": "Tasks"}}
    return render_template("applications/task/task.html", **context)


# ------------------------calendar
@main.route('/calendar_basic')
@login_required
def calendar_basic():
    context = {"breadcrumb": {"parent": "Apps", "child": "Calender Basic"}}
    return render_template("applications/calendar/calendar-basic.html", **context)


# ------------------------social-app
@main.route('/social_app')
@login_required
def social_app():
    context = {"breadcrumb": {"parent": "Apps", "child": "Social App"}}
    return render_template("applications/social-app/social-app.html", **context)


# ------------------------search
@main.route('/search')
@login_required
def search():
    context = {"breadcrumb": {"parent": "Search Pages", "child": "Search Website"}}
    return render_template("applications/search/search.html", **context)


# --------------------------------Forms & Table-----------------------------------------------
# --------------------------------Forms------------------------------------
# ------------------------form-controls
@login_required
@main.route('/form_validation')
def form_validation():
    context = {"breadcrumb": {"parent": "Form Controls", "child": "Validation Forms"}}
    return render_template("forms-table/forms/form-controls/form-validation/form-validation.html", **context)


@main.route('/base_input')
@login_required
def base_input():
    context = {"breadcrumb": {"parent": "Form Controls", "child": "Base Inputs"}}
    return render_template("forms-table/forms/form-controls/base-input/base-input.html", **context)


@main.route('/radio_checkbox_control')
@login_required
def radio_checkbox_control():
    context = {"breadcrumb": {"parent": "Form Controls", "child": "Checkbox & Radio"}}
    return render_template("forms-table/forms/form-controls/radio-checkbox-control/radio-checkbox-control.html",
                           **context)


@main.route('/input_group')
@login_required
def input_group():
    context = {"breadcrumb": {"parent": "Form Controls", "child": "Input Groups"}}
    return render_template("forms-table/forms/form-controls/input-group/input-group.html", **context)


@main.route('/megaoptions')
@login_required
def megaoptions():
    context = {"breadcrumb": {"parent": "Form control", "child": "Mega Options"}}
    return render_template("forms-table/forms/form-controls/megaoptions/megaoptions.html", **context)


# ---------------------------form widgets
@main.route('/datepicker')
@login_required
def datepicker():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Date Picker"}}
    return render_template("forms-table/forms/form-widgets/datepicker/datepicker.html", **context)


@main.route('/time_picker')
@login_required
def time_picker():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Time Picker"}}
    return render_template("forms-table/forms/form-widgets/time-picker/time-picker.html", **context)


@main.route('/datetimepicker')
@login_required
def datetimepicker():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Date Time Picker"}}
    return render_template('forms-table/forms/form-widgets/datetimepicker/datetimepicker.html', **context)


@main.route('/daterangepicker')
@login_required
def daterangepicker():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Date Range Picker"}}
    return render_template('forms-table/forms/form-widgets/daterangepicker/daterangepicker.html', **context)


@main.route('/touchspin')
@login_required
def touchspin():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Touchspin"}}
    return render_template('forms-table/forms/form-widgets/touchspin/touchspin.html', **context)


@main.route('/select2')
@login_required
def select2():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Select2"}}
    return render_template('forms-table/forms/form-widgets/select2/select2.html', **context)


@main.route('/switch')
@login_required
def switch():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Switch"}}
    return render_template('forms-table/forms/form-widgets/switch/switch.html', **context)


@main.route('/typeahead')
@login_required
def typeahead():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Typeahead"}}
    return render_template('forms-table/forms/form-widgets/typeahead/typeahead.html', **context)


@main.route('/clipboard')
@login_required
def clipboard():
    context = {"breadcrumb": {"parent": "Form Widgets", "child": "Clipboard"}}
    return render_template('forms-table/forms/form-widgets/clipboard/clipboard.html', **context)


# -----------------------form layout
@main.route('/default_form')
@login_required
def default_form():
    context = {"breadcrumb": {"parent": "Form Layout", "child": "Default Forms"}}
    return render_template('forms-table/forms/form-layout/default-form/default-form.html', **context)


@main.route('/form_wizard_one')
@login_required
def form_wizard_one():
    context = {"breadcrumb": {"parent": "Form Layout", "child": "Form Wizard"}}
    return render_template('forms-table/forms/form-layout/form-wizard/form-wizard.html', **context)


@main.route('/form_wizard_two')
@login_required
def form_wizard_two():
    context = {"breadcrumb": {"parent": "Form Layout", "child": "Step Form Wizard"}}
    return render_template('forms-table/forms/form-layout/form-wizard-two/form-wizard-two.html', **context)


@main.route('/form_wizard_three')
@login_required
def form_wizard_three():
    context = {"breadcrumb": {"parent": "Form Layout", "child": "Form Wizard With Icon"}}
    return render_template('forms-table/forms/form-layout/form-wizard-three/form-wizard-three.html', **context)


# ----------------------------------------------------Table------------------------------------------
# ------------------------bootstrap table
@main.route('/basic_table')
@login_required
def basic_table():
    context = {"breadcrumb": {"parent": "Bootstrap Tables", "child": "Bootstrap Basic Tables"}}
    return render_template('forms-table/table/bootstrap-table/basic-table/bootstrap-basic-table.html', **context)


@main.route('/sizing_table')
@login_required
def sizing_table():
    context = {"breadcrumb": {"parent": "Bootstrap Tables", "child": "Bootstrap Table Sizes"}}
    return render_template('forms-table/table/bootstrap-table/sizing-table/bootstrap-sizing-table.html', **context)


@main.route('/border_table')
@login_required
def border_table():
    context = {"breadcrumb": {"parent": "Bootstrap Tables", "child": "Bootstrap Border Table"}}
    return render_template('forms-table/table/bootstrap-table/border-table/bootstrap-border-table.html', **context)


@main.route('/styling_table')
@login_required
def styling_table():
    context = {"breadcrumb": {"parent": "Bootstrap Tables", "child": "Bootstrap Styling Tables"}}
    return render_template('forms-table/table/bootstrap-table/styling-table/bootstrap-styling-table.html', **context)


@main.route('/table_components')
@login_required
def table_components():
    context = {"breadcrumb": {"parent": "Bootstrap Tables", "child": "Table Components"}}
    return render_template('forms-table/table/bootstrap-table/table-components/table-components.html', **context)


# ------------------------data table
@main.route('/datatable_basic_init')
@login_required
def datatable_basic_init():
    context = {"breadcrumb": {"parent": "Data Tables", "child": "Basic DataTables"}}
    return render_template('forms-table/table/data-table/datatable-basic/datatable-basic-init.html', **context)


@login_required
@main.route('/datatable_advance')
def datatable_advance():
    context = {"breadcrumb": {"parent": "Data Tables", "child": "Advanced DataTables"}}
    return render_template('forms-table/table/data-table/datatable-advance/datatable-advance.html', **context)


@main.route('/datatable_styling')
@login_required
def datatable_styling():
    context = {"breadcrumb": {"parent": "Data Tables", "child": "Styling DataTables"}}
    return render_template('forms-table/table/data-table/datatable-styling/datatable-styling.html', **context)


@main.route('/datatable_AJAX')
@login_required
def datatable_AJAX():
    context = {"breadcrumb": {"parent": "Data Tables", "child": "Ajax DataTables"}}
    return render_template('forms-table/table/data-table/datatable-AJAX/datatable-AJAX.html', **context)


@main.route('/datatable_server_side')
@login_required
def datatable_server_side():
    context = {"breadcrumb": {"parent": "Data Tables", "child": "Datatables Server Side"}}
    return render_template('forms-table/table/data-table/datatable-server/datatable-server-side.html', **context)


@main.route('/datatable_plugin')
@login_required
def datatable_plugin():
    context = {"breadcrumb": {"parent": "Data Tables", "child": "Plugin DataTable"}}
    return render_template('forms-table/table/data-table/datatable-plugin/datatable-plugin.html', **context)


@main.route('/datatable_API')
@login_required
def datatable_API():
    context = {"breadcrumb": {"parent": "Data Tables", "child": "API DataTables"}}
    return render_template('forms-table/table/data-table/datatable-API/datatable-API.html', **context)


@main.route('/datatable_data_source')
@login_required
def datatable_data_source():
    context = {"breadcrumb": {"parent": "Data Tables", "child": "DATA Source DataTables"}}
    return render_template('forms-table/table/data-table/data-source/datatable-data-source.html', **context)


# -------------------------------EX.data-table
@main.route('/ext_autofill')
@login_required
def ext_autofill():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "Autofill Datatables"}}
    return render_template('forms-table/table/Ex-data-table/ext-autofill/datatable-ext-autofill.html', **context)


@login_required
@main.route('/ext_basic_button')
def ext_basic_button():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "Basic button"}}
    return render_template('forms-table/table/Ex-data-table/basic-button/datatable-ext-basic-button.html', **context)


@login_required
@main.route('/ext_col_reorder')
def ext_col_reorder():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "Columns Reorder"}}
    return render_template('forms-table/table/Ex-data-table/col-reorder/datatable-ext-col-reorder.html', **context)


@login_required
@main.route('/ext_fixed_header')
def ext_fixed_header():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "Fixed Header"}}
    return render_template('forms-table/table/Ex-data-table/fixed-header/datatable-ext-fixed-header.html', **context)


@login_required
@main.route('/ext_html_5_data_export')
def ext_html_5_data_export():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "HTML 5 Data Export"}}
    return render_template('forms-table/table/Ex-data-table/html-export/datatable-ext-html-5-data-export.html',
                           **context)


@main.route('/ext_key_table')
@login_required
def ext_key_table():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "Key Table"}}
    return render_template('forms-table/table/Ex-data-table/key-table/datatable-ext-key-table.html', **context)


@login_required
@main.route('/ext_responsive')
def ext_responsive():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "Responsive Datatables"}}
    return render_template('forms-table/table/Ex-data-table/ext-responsive/datatable-ext-responsive.html', **context)


@main.route('/ext_row_reorder')
@login_required
def ext_row_reorder():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "Rows Reorder"}}
    return render_template('forms-table/table/Ex-data-table/row-reorder/datatable-ext-row-reorder.html', **context)


@main.route('/ext_scroller')
@login_required
def ext_scroller():
    context = {"breadcrumb": {"parent": "Extension Data Tables", "child": "Scroller"}}
    return render_template('forms-table/table/Ex-data-table/ext-scroller/datatable-ext-scroller.html', **context)


# --------------------------------jsgrid_table
@main.route('/jsgrid_table')
@login_required
def jsgrid_table():
    context = {"breadcrumb": {"parent": "Tables", "child": "JS Grid Tables"}}
    return render_template('forms-table/table/js-grid-table/jsgrid-table.html', **context)


# ------------------Components------UI Components-----Elements ----------->

# -----------------------------Ui kits
@main.route('/statecolor')
@login_required
def statecolor():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "State Color"}}
    return render_template('components/ui-kits/state-color.html', **context)


@main.route('/typography')
@login_required
def typography():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Typography"}}
    return render_template('components/ui-kits/typography.html', **context)


@main.route('/avatars')
@login_required
def avatars():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Avatars"}}
    return render_template('components/ui-kits/avatars.html', **context)


@main.route('/helper')
@login_required
def helper():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Helper Classes"}}
    return render_template('components/ui-kits/helper.html', **context)


@main.route('/grid')
@login_required
def grid():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "grid"}}
    return render_template('components/ui-kits/grid.html', **context)


@main.route('/tagpill')
@login_required
def tagpill():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Tag & Pills"}}
    return render_template('components/ui-kits/tag-pills.html', **context)


@main.route('/progressbar')
@login_required
def progressbar():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Progress"}}
    return render_template('components/ui-kits/progressbar.html', **context)


@main.route('/modal')
@login_required
def modal():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "modal"}}
    return render_template('components/ui-kits/modal.html', **context)


@main.route('/alert')
@login_required
def alert():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "alert"}}
    return render_template('components/ui-kits/alert.html', **context)


@main.route('/popover')
@login_required
def popover():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "popover"}}
    return render_template('components/ui-kits/popover.html', **context)


@main.route('/tooltip')
@login_required
def tooltip():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "tooltip"}}
    return render_template('components/ui-kits/tooltip.html', **context)


@main.route('/spiners')
@login_required
def spiners():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Spinners"}}
    return render_template('components/ui-kits/spiners.html', **context)


@main.route('/dropdown')
@login_required
def dropdown():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "dropdown"}}
    return render_template('components/ui-kits/dropdown.html', **context)


@main.route('/accordion')
@login_required
def accordion():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "accordion"}}
    return render_template('components/ui-kits/accordion.html', **context)


@main.route('/bootstraptab')
@login_required
def bootstraptab():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Bootstrap Tabs"}}
    return render_template('components/ui-kits/bootstraptab.html', **context)


@main.route('/linetab')
@login_required
def linetab():
    context = {"breadcrumb": {"parent": "Tabs", "child": "Line Tabs"}}
    return render_template('components/ui-kits/linetab.html', **context)


@main.route('/navs')
@login_required
def navs():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "navs"}}
    return render_template('components/ui-kits/navs.html', **context)


@main.route('/shadow')
@login_required
def shadow():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Box Shadow"}}
    return render_template('components/ui-kits/shadow.html', **context)


@main.route('/lists')
@login_required
def lists():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "Lists"}}
    return render_template('components/ui-kits/lists.html', **context)


# -------------------------------Bonus Ui
@login_required
@main.route('/scrollable')
def scrollable():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Scrollable"}}
    return render_template('components/bonus-ui/scrollable.html', **context)


@login_required
@main.route('/tree')
def tree():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Tree View"}}
    return render_template('components/bonus-ui/tree.html', **context)


@login_required
@main.route('/bootstrapnotify')
def bootstrapnotify():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Bootstrap Notify"}}
    return render_template('components/bonus-ui/bootstrapnotify.html', **context)


@main.route('/rating')
@login_required
def rating():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "rating"}}
    return render_template('components/bonus-ui/rating.html', **context)


@main.route('/dropzone')
@login_required
def dropzone():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "dropzone"}}
    return render_template('components/bonus-ui/dropzone.html', **context)


@main.route('/tour')
@login_required
def tour():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "tour"}}
    return render_template('components/bonus-ui/tour.html', **context)


@main.route('/sweetalert2')
@login_required
def sweetalert2():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Sweet Alert"}}
    return render_template('components/bonus-ui/sweetalert.html', **context)


@main.route('/animatedmodal')
@login_required
def animatedmodal():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Animated Modal"}}
    return render_template('components/bonus-ui/animatedmodal.html', **context)


@main.route('/owlcarousel')
@login_required
def owlcarousel():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Owl Carousel"}}
    return render_template('components/bonus-ui/owlcarousel.html', **context)


@main.route('/ribbons')
@login_required
def ribbons():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Ribbons"}}
    return render_template('components/bonus-ui/ribbons.html', **context)


@main.route('/pagination')
@login_required
def pagination():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Pagination"}}
    return render_template('components/bonus-ui/pagination.html', **context)


@main.route('/steps')
@login_required
def steps():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Steps"}}
    return render_template('components/bonus-ui/steps.html', **context)


@main.route('/breadcrumb')
@login_required
def breadcrumb():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Breadcrumb"}}
    return render_template('components/bonus-ui/breadcrumb.html', **context)


@main.route('/rangeslider')
@login_required
def rangeslider():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Range Slider  "}}
    return render_template('components/bonus-ui/rangeslider.html', **context)


@main.route('/imagecropper')
@login_required
def imagecropper():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Image Cropper"}}
    return render_template('components/bonus-ui/imagecropper.html', **context)


@main.route('/sticky')
@login_required
def sticky():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Sticky"}}
    return render_template('components/bonus-ui/sticky.html', **context)


@main.route('/basiccard')
@login_required
def basiccard():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Basic Card"}}
    return render_template('components/bonus-ui/basiccard.html', **context)


@main.route('/creativecard')
@login_required
def creativecard():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Creative Card"}}
    return render_template('components/bonus-ui/creativecard.html', **context)


@main.route('/tabbedcard')
@login_required
def tabbedcard():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Tabbed Card"}}
    return render_template('components/bonus-ui/tabbedcard.html', **context)


@main.route('/draggablecard')
@login_required
def draggablecard():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Draggable Card"}}
    return render_template('components/bonus-ui/draggablecard.html', **context)


@main.route('/timeline1')
@login_required
def timeline1():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Timeline 1"}}
    return render_template('components/bonus-ui/timeline1.html', **context)


@main.route('/timeline2')
@login_required
def timeline2():
    context = {"breadcrumb": {"parent": "Bonus Ui", "child": "Timeline 2"}}
    return render_template('components/bonus-ui/timeline2.html', **context)


# ------------------------------Builders
@main.route('/formbuilder1')
@login_required
def formbuilder1():
    context = {"breadcrumb": {"parent": "Builders", "child": "Form Builder 1"}}
    return render_template('components/builders/formbuilder1.html', **context)


@main.route('/formbuilder2')
@login_required
def formbuilder2():
    context = {"breadcrumb": {"parent": "Builders", "child": "Form Builder 2"}}
    return render_template('components/builders/formbuilder2.html', **context)


@main.route('/pagebuild')
@login_required
def pagebuild():
    context = {"breadcrumb": {"parent": "Builders", "child": "Page Builder"}}
    return render_template('components/builders/pagebuild.html', **context)


@main.route('/buttonbuilder')
@login_required
def buttonbuilder():
    context = {"layout": "button-builder", "breadcrumb": {"parent": "Form Builder", "child": "Button Builder"}}
    return render_template('components/builders/buttonbuilder.html', **context)


# ---------------------------------Animation
@main.route('/animate')
@login_required
def animate():
    context = {"breadcrumb": {"parent": "Animation", "child": "Animate"}}
    return render_template('components/animation/animate.html', **context)


@main.route('/scrollreval')
@login_required
def scrollreval():
    context = {"breadcrumb": {"parent": "Animation", "child": "scroll reveal"}}
    return render_template('components/animation/scrollreval.html', **context)


@main.route('/AOS')
@login_required
def AOS():
    context = {"breadcrumb": {"parent": "Animation", "child": "AOS Animation"}}
    return render_template('components/animation/AOS.html', **context)


@main.route('/tilt')
@login_required
def tilt():
    context = {"breadcrumb": {"parent": "Animation", "child": "Tilt Animation"}}
    return render_template('components/animation/tilt.html', **context)


@main.route('/wow')
@login_required
def wow():
    context = {"breadcrumb": {"parent": "Animation", "child": "Wow Animation"}}
    return render_template('components/animation/wow.html', **context)


# --------------------------Icons
@main.route('/flagicon')
@login_required
def flagicon():
    context = {"breadcrumb": {"parent": "Icons", "child": "Flag Icons"}}
    return render_template('components/icons/flagicon.html', **context)


@main.route('/fontawesome')
@login_required
def fontawesome():
    context = {"breadcrumb": {"parent": "Icons", "child": "Font Awesome Icon"}}
    return render_template('components/icons/fontawesome.html', **context)


@main.route('/icoicon')
@login_required
def icoicon():
    context = {"breadcrumb": {"parent": "Ui Kits", "child": "ICO Icon"}}
    return render_template('components/icons/icoicon.html', **context)


@main.route('/themify')
@login_required
def themify():
    context = {"breadcrumb": {"parent": "Icons", "child": "Themify Icon"}}
    return render_template('components/icons/themify.html', **context)


@main.route('/feather')
@login_required
def feather():
    context = {"breadcrumb": {"parent": "Icons", "child": "Feather Icons"}}
    return render_template('components/icons/feather.html', **context)


@main.route('/whether')
@login_required
def whether():
    context = {"breadcrumb": {"parent": "Icons", "child": "Whether Icon"}}
    return render_template('components/icons/whether.html', **context)


# --------------------------------Buttons
@main.route('/buttons')
@login_required
def buttons():
    context = {"breadcrumb": {"parent": "Buttons", "child": "Default Style"}}
    return render_template('components/buttons/buttons.html', **context)


@main.route('/flat')
@login_required
def flat():
    context = {"breadcrumb": {"parent": "Buttons", "child": "Flat Buttons"}}
    return render_template('components/buttons/flat.html', **context)


@main.route('/edge')
@login_required
def edge():
    context = {"breadcrumb": {"parent": "Buttons", "child": "edge"}}
    return render_template('components/buttons/edge.html', **context)


@main.route('/raised')
@login_required
def raised():
    context = {"breadcrumb": {"parent": "Buttons", "child": "Raised Buttons"}}
    return render_template('components/buttons/raised.html', **context)


@main.route('/group')
@login_required
def group():
    context = {"breadcrumb": {"parent": "Buttons", "child": "Button Group"}}
    return render_template('components/buttons/btn-group.html', **context)


# -------------------------------charts

@main.route('/echarts')
@login_required
def echarts():
    context = {"breadcrumb": {"parent": "charts", "child": "Echarts"}}
    return render_template('components/charts/echarts.html', **context)


@main.route('/apex')
@login_required
def apex():
    context = {"breadcrumb": {"parent": "charts", "child": "Apex Chart"}}
    return render_template('components/charts/apex.html', **context)


@main.route('/chartjs')
@login_required
def chartjs():
    context = {"breadcrumb": {"parent": "charts", "child": "ChartJS Chart"}}
    return render_template('components/charts/chartjs.html', **context)


@main.route('/chartist')
@login_required
def chartist():
    context = {"breadcrumb": {"parent": "charts", "child": "chartist"}}
    return render_template('components/charts/chartist.html', **context)


@main.route('/flot')
@login_required
def flot():
    context = {"breadcrumb": {"parent": "charts", "child": "flot"}}
    return render_template('components/charts/flot.html', **context)


@main.route('/google')
@login_required
def google():
    context = {"breadcrumb": {"parent": "charts", "child": "Google Chart"}}
    return render_template('components/charts/google.html', **context)


@main.route('/knob')
@login_required
def knob():
    context = {"breadcrumb": {"parent": "charts", "child": "Knob Chart"}}
    return render_template('components/charts/knob.html', **context)


@main.route('/morris')
@login_required
def morris():
    context = {"breadcrumb": {"parent": "charts", "child": "Morris Chart"}}
    return render_template('components/charts/morris.html', **context)


@main.route('/peity')
@login_required
def peity():
    context = {"breadcrumb": {"parent": "charts", "child": "Peity Chart"}}
    return render_template('components/charts/peity.html', **context)


@main.route('/sparkline')
@login_required
def sparkline():
    context = {"breadcrumb": {"parent": "charts", "child": "sparkline"}}
    return render_template('components/charts/sparkline.html', **context)


# ------------------------------------------Pages-------------------------------------

# -------------------------sample-page
@main.route('/sample_page')
@login_required
def sample_page():
    context = {"breadcrumb": {"parent": "Pages", "child": "Sample Page"}}
    return render_template('pages/sample-page/sample-page.html', **context)


# --------------------------internationalization
@main.route('/internationalization')
@login_required
def internationalization():
    context = {"breadcrumb": {"parent": "Pages", "child": "Internationalization"}}
    return render_template('pages/internationalization/internationalization.html', **context)


# --------------------------starter-kit
@main.route('/starter_kit')
@login_required
def starter_kit():
    return render_template('pages/starter-kit/starter-kit.html')


# -----------------------------------------------others

# ------------------------------error page

@main.route('/error_400')
@login_required
def error_400():
    return render_template('pages/others/error-page/error-page/error-400.html')


@main.route('/error_401')
@login_required
def error_401():
    return render_template('pages/others/error-page/error-page/error-401.html')


@main.route('/error_403')
@login_required
def error_403():
    return render_template('pages/others/error-page/error-page/error-403.html')


@main.route('/error_404')
@login_required
def error_404():
    return render_template('pages/others/error-page/error-page/error-404.html')


@main.route('/error_500')
@login_required
def error_500():
    return render_template('pages/others/error-page/error-page/error-500.html')


@main.route('/error_503')
@login_required
def error_503():
    return render_template('pages/others/error-page/error-page/error-503.html')


# ----------------------------------Authentication

@main.route('/login_one')
@login_required
def login_one():
    return render_template('pages/others/authentication/login-one/login-one.html')


@main.route('/login_simple')
@login_required
def login_simple():
    return render_template('pages/others/authentication/login/login.html')


@main.route('/login_two')
@login_required
def login_two():
    return render_template('pages/others/authentication/login-two/login-two.html')


@main.route('/login_bs_validation')
@login_required
def login_bs_validation():
    return render_template('pages/others/authentication/login-bs-validation/login-bs-validation.html')


@main.route('/login_tt_validation')
@login_required
def login_tt_validation():
    return render_template('pages/others/authentication/login-bs-tt-validation/login-bs-tt-validation.html')


@main.route('/login_validation')
@login_required
def login_validation():
    return render_template('pages/others/authentication/login-sa-validation/login-sa-validation.html')


@main.route('/sign_up')
@login_required
def sign_up():
    return render_template('pages/others/authentication/sign-up/sign-up.html')


@main.route('/sign_one')
@login_required
def sign_one():
    return render_template('pages/others/authentication/sign-one/sign-up-one.html')


@main.route('/sign_two')
@login_required
def sign_two():
    return render_template('pages/others/authentication/sign-two/sign-up-two.html')


@main.route('/sign_wizard')
@login_required
def sign_wizard():
    return render_template('pages/others/authentication/sign-up-wizard/sign-up-wizard.html')


@main.route('/unlock')
@login_required
def unlock():
    return render_template('pages/others/authentication/unlock/unlock.html')


@main.route('/forget_password_one')
@login_required
def forget_password():
    return render_template('pages/others/authentication/forget-password/forget-password.html')


@main.route('/reset_password')
@login_required
def reset_password():
    return render_template('pages/others/authentication/reset-password/reset-password.html')


@main.route('/maintenance')
@login_required
def maintenance():
    return render_template('pages/others/authentication/maintenance/maintenance.html')


# ---------------------------------------comingsoon
@main.route('/comingsoon')
@login_required
def comingsoon():
    return render_template('pages/others/comingsoon/comingsoon/comingsoon.html')


@main.route('/comingsoon_video')
@login_required
def comingsoon_video():
    return render_template('pages/others/comingsoon/comingsoon-video/comingsoon-bg-video.html')


@main.route('/comingsoon_img')
@login_required
def comingsoon_img():
    return render_template('pages/others/comingsoon/comingsoon-img/comingsoon-bg-img.html')


# ----------------------------------Email-Template
@main.route('/basic_temp')
@login_required
def basic_temp():
    return render_template('pages/others/email-templates/basic-email/basic-template.html')


@main.route('/email_header')
@login_required
def email_header():
    return render_template('pages/others/email-templates/basic-header/email-header.html')


@main.route('/template_email')
@login_required
def template_email():
    return render_template('pages/others/email-templates/ecom-template/template-email.html')


@main.route('/template_email_2')
@login_required
def template_email_2():
    return render_template('pages/others/email-templates/template-email-2/template-email-2.html')


@main.route('/ecommerce_temp')
@login_required
def ecommerce_temp():
    return render_template('pages/others/email-templates/ecom-email/ecommerce-templates.html')


@main.route('/email_order')
@login_required
def email_order():
    return render_template('pages/others/email-templates/order-success/email-order-success.html')


# ------------------------------------------Miscellaneous----------------- -------------------------

# --------------------------------------gallery
@main.route('/gallery_grid')
@login_required
def gallery_grid():
    context = {"breadcrumb": {"parent": "Gallery", "child": "Gallery"}}
    return render_template('miscellaneous/gallery/gallery-grid/gallery.html', **context)


@login_required
@main.route('/grid_description')
def grid_description():
    context = {"breadcrumb": {"parent": "Gallery", "child": "Gallery Grid With Description"}}
    return render_template('miscellaneous/gallery/gallery-grid-desc/gallery-with-description.html', **context)


@login_required
@main.route('/masonry_gallery')
def masonry_gallery():
    context = {"breadcrumb": {"parent": "Gallery", "child": "Masonry Gallery"}}
    return render_template('miscellaneous/gallery/masonry-gallery/gallery-masonry.html', **context)


@main.route('/masonry_disc')
@login_required
def masonry_disc():
    context = {"breadcrumb": {"parent": "Gallery", "child": "Masonry Gallery With Description"}}
    return render_template('miscellaneous/gallery/masonry-with-desc/masonry-gallery-with-disc.html', **context)


@main.route('/hover')
@login_required
def hover():
    context = {"breadcrumb": {"parent": "Gallery", "child": "Image Hover Effects"}}
    return render_template('miscellaneous/gallery/hover-effects/gallery-hover.html', **context)


# ------------------------------------Blog
@main.route('/blog_details')
@login_required
def blog_details():
    context = {"breadcrumb": {"parent": "Blog", "child": "Blog Details"}}
    return render_template('miscellaneous/blog/blog-details/blog.html', **context)


@main.route('/blog_single')
@login_required
def blog_single():
    context = {"breadcrumb": {"parent": "Blog", "child": "Blog Single"}}
    return render_template('miscellaneous/blog/blog-single/blog-single.html', **context)


@main.route('/add_post')
@login_required
def add_post():
    context = {"breadcrumb": {"parent": "Blog", "child": "Add Post"}}
    return render_template('miscellaneous/blog/add-post/add-post.html', **context)


# --------------------------------------faq
@main.route('/FAQ')
@login_required
def FAQ():
    context = {"breadcrumb": {"parent": "FAQ", "child": "FAQ"}}
    return render_template('miscellaneous/FAQ/faq.html', **context)


# ---------------------------------job serach
@main.route('/job_cards')
@login_required
def job_cards():
    context = {"breadcrumb": {"parent": "Job Search", "child": "Cards View"}}
    return render_template('miscellaneous/job-search/cards-view/job-cards-view.html', **context)


@login_required
@main.route('/job_list')
def job_list():
    context = {"breadcrumb": {"parent": "Job Search", "child": "List View"}}
    return render_template('miscellaneous/job-search/list-view/job-list-view.html', **context)


@login_required
@main.route('/job_details')
def job_details():
    context = {"breadcrumb": {"parent": "Job Search", "child": "Job Details"}}
    return render_template('miscellaneous/job-search/job-details/job-details.html', **context)


@login_required
@main.route('/apply')
def apply():
    context = {"breadcrumb": {"parent": "Job Search", "child": "Apply"}}
    return render_template('miscellaneous/job-search/apply/job-apply.html', **context)


# ------------------------------------Learning
@login_required
@main.route('/learning_list')
def learning_list():
    context = {"breadcrumb": {"parent": "Learning", "child": "Learning List"}}
    return render_template('miscellaneous/learning/learning-list/learning-list-view.html', **context)


@main.route('/learning_detailed')
@login_required
def learning_detailed():
    context = {"breadcrumb": {"parent": "Learning", "child": "Detailed Course"}}
    return render_template('miscellaneous/learning/learning-detailed/learning-detailed.html', **context)


# ----------------------------------------Maps.
@main.route('/maps_js')
@login_required
def maps_js():
    context = {"breadcrumb": {"parent": "Maps", "child": "Map JS"}}
    return render_template('miscellaneous/maps/maps-js/map-js.html', **context)


@login_required
@main.route('/vector_maps')
def vector_maps():
    context = {"breadcrumb": {"parent": "Maps", "child": "Vector Maps"}}
    return render_template('miscellaneous/maps/vector-maps/vector-map.html', **context)


# ------------------------------------Editors
@main.route('/summernote')
@login_required
def summernote():
    context = {"breadcrumb": {"parent": "Editors", "child": "Summer Note"}}
    return render_template('miscellaneous/editors/summer-note/summernote.html', **context)


@main.route('/ckeditor')
@login_required
def ckeditor():
    context = {"breadcrumb": {"parent": "Editors", "child": "Ck Editor"}}
    return render_template('miscellaneous/editors/ckeditor/ckeditor.html', **context)


@main.route('/simple_mde')
@login_required
def simple_mde():
    context = {"breadcrumb": {"parent": "Editors", "child": "MDE Editor"}}
    return render_template('miscellaneous/editors/simple-mde/simple-mde.html', **context)


@login_required
@main.route('/ace_code')
def ace_code():
    context = {"breadcrumb": {"parent": "Editors", "child": "ACE Code Editor"}}
    return render_template('miscellaneous/editors/ace-code/ace-code.html', **context)


# ----------------------------knowledgeUi Kits
@main.route('/knowledgebase')
@login_required
def knowledgebase():
    context = {"breadcrumb": {"parent": "KnowledgeUi Kits", "child": "KnowledgeUi Kits"}}
    return render_template('miscellaneous/knowledgebase/knowledgebase.html', **context)


# -----------------------------support-ticket
@main.route('/support_ticket')
@login_required
def support_ticket():
    context = {"breadcrumb": {"parent": "Apps", "child": "Support Ticket"}}
    return render_template("miscellaneous/support-ticket/support-ticket.html", **context)


# ---------------------------------------------------------------------------------------

@main.route('/to_do_view')
@login_required
def to_do_view():
    context = {"breadcrumb": {"parent": "Apps", "child": "To-Do"}}
    return render_template('applications/to-do/main-todo.html', **context)


@main.route('/to_do_database')
@login_required
def to_do_database():
    todos = Todo.query.all()
    allTasksComplete = True

    for todo in todos:
        if not todo.completed:
            allTasksComplete = False
            break

    context = {"allTasksComplete": allTasksComplete, "todos": todos,
               "breadcrumb": {"parent": "Todo", "child": "Todo with database"}}

    return render_template('applications/to-do/to-do.html', **context)


@main.route('/to_do_database', methods=['POST'])
def add_todo():
    description = request.form.get('description')
    if description != '':
        new_task = Todo(description=description)
        db.session.add(new_task)
        db.session.commit()

    return redirect('/to_do_database')


@main.route('/markAllTasksComplete')
def markAllComplete():
    todos = Todo.query.all()
    for todo in todos:
        update_todo = Todo.query.filter_by(id=todo.id).first()
        update_todo.completed = True
        db.session.commit()
    return redirect('/to_do_database')


@main.route('/toggleComplete/<int:id>')
def toggleComplete(id):
    todo = Todo.query.filter_by(id=id).first()
    todo.completed = not todo.completed
    db.session.commit()
    return redirect('/to_do_database')


@main.route('/deleteTask/<int:id>')
def deleteTask(id):
    Todo.query.filter_by(id=id).delete()
    db.session.commit()
    return redirect('/to_do_database')
