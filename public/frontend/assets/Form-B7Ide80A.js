import{b as G,c as L}from"./index-6Eoza2Ey.js";import{i as g,a as h,c as z,O as v,w as f,j as b,y as T,n as _,l as x,q as y,a5 as H}from"./frappe-ui-D0s9hLeI.js";import J from"./FormView-BgupmWP-.js";import K from"./ExpensesTable-CTrW7lnm.js";import Q from"./ExpenseTaxesTable-DH_HYGZp.js";import W from"./ExpenseAdvancesTable-BnC-D1ee.js";import{g as X}from"./workflow-B78wL7-d.js";import"./FormField-HYhAgVMZ.js";import"./Link-ByAo2phx.js";import"./FileUploaderView-DbIitR0G.js";import"./WorkflowActionSheet-B_rv5dx0.js";import"./formatters-B67gliVk.js";import"./CustomIonModal-YY5l0RNW.js";import"./claims-Dm7B8wIH.js";const ie={__name:"Form",props:{id:{type:String,required:!1}},setup(A){const O=g("$dayjs"),s=g("$employee"),R=O().format("YYYY-MM-DD"),i=h(!1),u=A,k=[{name:"Expenses",lastField:"taxes"},{name:"Advances",lastField:"advances"},{name:"Totals",lastField:"cost_center"}],a=h({employee:s.data.name,company:s.data.company}),F=z(()=>X(a.value.company)),p=v({url:"hrms.api.get_doctype_fields",params:{doctype:"Expense Claim"},transform(e){return S(e).map(t=>(t.fieldname==="posting_date"&&(t.default=R),w(t)))},onSuccess(e){V.reload(),$.reload()}});p.reload();const I=v({url:"hrms.hr.doctype.expense_claim.expense_claim.get_advances",params:{employee:s.data.name},auto:!0,onSuccess(e){var n;return u.id?(n=a.value.advances)==null||n.map(t=>t.selected=!0):a.value.advances=[],e.forEach(t=>{var l,o;u.id&&((l=a.value.advances)!=null&&l.some(m=>m.employee_advance===t.name))||(o=a.value.advances)==null||o.push({employee_advance:t.name,purpose:t.purpose,posting_date:t.posting_date,advance_account:t.advance_account,advance_paid:t.paid_amount,unclaimed_amount:t.paid_amount-t.claimed_amount,allocated_amount:0})})}}),V=v({url:"hrms.api.get_expense_approval_details",params:{employee:s.data.name},onSuccess(e){D(e)}}),$=v({url:"hrms.api.get_company_cost_center_and_expense_account",params:{company:a.value.company},onSuccess(e){a.value.cost_center=e==null?void 0:e.cost_center,a.value.payable_account=e==null?void 0:e.default_expense_claim_payable_account}});f(()=>a.value.employee,e=>{u.id&&e!==s.data.name&&N()}),f(()=>u.id&&a.value.expenses,e=>{a.value.docstatus===0&&I.reload()}),f(()=>a.value.advances,e=>{M()},{deep:!0}),f(()=>a.value.cost_center,()=>{var e,n;(n=(e=a==null?void 0:a.value)==null?void 0:e.expenses)==null||n.forEach(t=>{t.cost_center=a.value.cost_center})});function S(e){const n=["naming_series","task","taxes_and_charges_sb","advance_payments_sb"],t=["employee","employee_name","department","company","remark","is_paid","mode_of_payment","clearance_date","approval_status"];return u.id||n.push(...t),e.filter(l=>!n.includes(l.fieldname))}function w(e){return e.fieldname==="payable_account"?e.linkFilters={report_type:"Balance Sheet",account_type:"Payable",company:a.value.company,is_group:0}:e.fieldname==="cost_center"?e.linkFilters={company:a.value.company,is_group:0}:e.fieldname==="project"&&(e.linkFilters={company:a.value.company}),e}function D(e){var t;const n=(t=p.data)==null?void 0:t.find(l=>l.fieldname==="expense_approver");n.reqd=e==null?void 0:e.is_mandatory,n.documentList=e==null?void 0:e.department_approvers.map(l=>({label:l.full_name?`${l.name} : ${l.full_name}`:l.name,value:l.name})),a.value.expense_approver=e==null?void 0:e.expense_approver,a.value.expense_approver_name=e==null?void 0:e.expense_approver_name}function U(e){a.value.expenses||(a.value.expenses=[]),a.value.expenses.push(e),E(),r(),c()}function j(e,n){a.value.expenses[n]=e,E(),r(),c()}function C(e){a.value.expenses.splice(e,1),E(),r(),c()}function Y(e){a.value.taxes||(a.value.taxes=[]),a.value.taxes.push(e),r(),c()}function q(e,n){a.value.taxes[n]=e,r(),c()}function B(e){a.value.taxes.splice(e,1),r(),c()}function E(){var t,l;let e=0,n=0;(l=(t=a.value)==null?void 0:t.expenses)==null||l.forEach(o=>{e+=parseFloat(o.amount),n+=parseFloat(o.sanctioned_amount)}),a.value.total_claimed_amount=e,a.value.total_sanctioned_amount=n,d()}function r(){var n,t;let e=0;(t=(n=a.value)==null?void 0:n.taxes)==null||t.forEach(l=>{l.rate&&(l.tax_amount=parseFloat(a.value.total_sanctioned_amount)*parseFloat(l.rate/100)),l.total=parseFloat(l.tax_amount)+parseFloat(a.value.total_sanctioned_amount),e+=parseFloat(l.tax_amount)}),a.value.total_taxes_and_charges=e,d()}function d(){a.value.grand_total=parseFloat(a.value.total_sanctioned_amount||0)+parseFloat(a.value.total_taxes_and_charges||0)-parseFloat(a.value.total_advance_amount||0)}function c(){var t,l;let e=parseFloat(a.value.total_sanctioned_amount)+parseFloat(a.value.total_taxes_and_charges),n=0;(l=(t=a==null?void 0:a.value)==null?void 0:t.advances)==null||l.forEach(o=>{e>=parseFloat(o.unclaimed_amount)?(o.allocated_amount=parseFloat(o.unclaimed_amount),e-=parseFloat(o.allocated_amount)):(o.allocated_amount=e,e=0),o.selected=o.allocated_amount>0,n+=parseFloat(o.allocated_amount)}),a.value.total_advance_amount=n,d()}function M(){var n,t;let e=0;(t=(n=a==null?void 0:a.value)==null?void 0:n.advances)==null||t.forEach(l=>{l.selected&&(e+=parseFloat(l.allocated_amount))}),a.value.total_advance_amount=e,d()}function N(){a.value.expense_approver!==s.data.user_id&&(p.data.map(e=>e.read_only=!0),i.value=!0)}function P(){var e,n,t,l,o;(e=a==null?void 0:a.value)!=null&&e.advances&&(a.value.advances=(t=(n=a==null?void 0:a.value)==null?void 0:n.advances)==null?void 0:t.filter(m=>m.selected),(o=(l=a==null?void 0:a.value)==null?void 0:l.expenses)==null||o.forEach(m=>{m.cost_center=a.value.cost_center}))}return(e,n)=>(b(),T(y(L),null,{default:_(()=>[x(y(G),{fullscreen:!0},{default:_(()=>[y(p).data?(b(),T(J,{key:0,doctype:"Expense Claim",modelValue:a.value,"onUpdate:modelValue":n[3]||(n[3]=t=>a.value=t),isSubmittable:!0,fields:y(p).data,id:u.id,tabbedView:!0,tabs:k,showAttachmentView:!0,onValidateForm:P},{expenses:_(({isFormReadOnly:t})=>[x(K,{expenseClaim:a.value,"onUpdate:expenseClaim":n[0]||(n[0]=l=>a.value=l),currency:F.value,isReadOnly:i.value||t,onAddExpenseItem:U,onUpdateExpenseItem:j,onDeleteExpenseItem:C},null,8,["expenseClaim","currency","isReadOnly"])]),taxes:_(({isFormReadOnly:t})=>[x(Q,{expenseClaim:a.value,"onUpdate:expenseClaim":n[1]||(n[1]=l=>a.value=l),currency:F.value,isReadOnly:i.value||t,onAddExpenseTax:Y,onUpdateExpenseTax:q,onDeleteExpenseTax:B},null,8,["expenseClaim","currency","isReadOnly"])]),advances:_(({isFormReadOnly:t})=>[x(W,{expenseClaim:a.value,"onUpdate:expenseClaim":n[2]||(n[2]=l=>a.value=l),currency:F.value,isReadOnly:i.value||t},null,8,["expenseClaim","currency","isReadOnly"])]),_:1},8,["modelValue","fields","id"])):H("",!0)]),_:1})]),_:1}))}};export{ie as default};
//# sourceMappingURL=Form-B7Ide80A.js.map
