import frappe
from frappe.utils import time_diff_in_hours, formatdate

def execute(filters=None):
    columns = [
        {"label": "Employee", "fieldname": "employee", "fieldtype": "Data", "width": 100},
        {"label": "Employee Name", "fieldname": "employee_name", "fieldtype": "Data", "width": 150},
        {"label": "Date", "fieldname": "date", "fieldtype": "Date", "width": 100},
        {"label": "Status", "fieldname": "status", "fieldtype": "Data", "width": 100},
        {"label": "Check In", "fieldname": "check_in", "fieldtype": "Time", "width": 100},
        {"label": "Check Out", "fieldname": "check_out", "fieldtype": "Time", "width": 100},
        {"label": "Duration", "fieldname": "duration", "fieldtype": "Data", "width": 100}
    ]
 
    data = []
    dates = []
    durations = []
 
    attendance_records = frappe.db.sql("""
        SELECT
            ec.employee, e.employee_name, DATE(ec.time) as date,
            MIN(CASE WHEN ec.log_type = 'IN' THEN ec.time ELSE NULL END) as check_in,
            MAX(CASE WHEN ec.log_type = 'OUT' THEN ec.time ELSE NULL END) as check_out
        FROM `tabEmployee Checkin` ec
        LEFT JOIN `tabEmployee` e ON e.name = ec.employee
        GROUP BY ec.employee, DATE(ec.time)
    """, as_dict=True)
 
    for record in attendance_records:
        check_in = record.get("check_in")
        check_out = record.get("check_out")
        duration = None
        status = "Present" if check_in and check_out else "Absent"
        
        # Calculate duration if both check-in and check-out times are available
        if check_in and check_out:
            duration = time_diff_in_hours(check_out, check_in)
            dates.append(formatdate(record.get("date")))  # Add date for the chart
            durations.append(duration)  # Add duration for the chart
        
        data.append({
            "employee": record.get("employee"),
            "employee_name": record.get("employee_name"),
            "date": formatdate(record.get("date")),
            "status": status,
            "check_in": check_in.strftime('%H:%M') if check_in else "-",
            "check_out": check_out.strftime('%H:%M') if check_out else "-",
            "duration": f"{int(duration)}:{int((duration - int(duration)) * 60)}" if duration else "-"
        })

    # Chart data configuration
    chart_data = {
        "data": {
            "labels": dates,  # X-axis with dates
            "datasets": [{
                "name": "Working Hours",  # Name of the dataset
                "values": durations  # Y-axis with working hours
            }]
        },
        "type": "bar",
        "title": "Employee Working Hours Per Day",
        "colors": ["#34D399"],  # Set the color for bars
        "xAxisLabel": "Date",
        "yAxisLabel": "Working Hours"
    }

    # Return the chart along with table data
    return columns, data, chart_data
