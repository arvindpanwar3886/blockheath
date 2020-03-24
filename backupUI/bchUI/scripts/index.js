var aboutUs;

window.onload = function() {
  aboutUs = document.getElementById("aboutUs");
  $("#records").DataTable({
    dom: "Bfrtip",
    ordering: false,
    search: {
      className: "input"
    },
    language: {
      searchPlaceholder: "Search records"
    },
    buttons: [
      {
        extend: "copyHtml5",
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5]
        },
        className: "btnCircleSm mlr1",
        text: '<i class="material-icons"> content_copy </i>',
        titleAttr: "Copy"
      },
      {
        extend: "excelHtml5",
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5]
        },
        className: "btnCircleSm mlr1",
        text: '<i class="material-icons"> description </i>',
        titleAttr: "Export data to excel file"
      },
      {
        extend: "csvHtml5",
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5]
        },
        className: "btnCircleSm mlr1",
        text: '<i class="material-icons"> insert_drive_file </i>',
        titleAttr: "Export data to csv file"
      },
      {
        extend: "pdfHtml5",
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5]
        },
        className: "btnCircleSm mlr1",
        text: '<i class="material-icons"> picture_as_pdf </i>',
        titleAttr: "Export data to pdf file"
      },
      {
        extend: "print",
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5]
        },
        className: "btnCircleSm mlr1",
        text: '<i class="material-icons"> print </i>',
        titleAttr: "Print"
      }
    ]
    // ajax: {
    //   url: url,
    //   dataSrc: function(res) {
    //     setExpenditures(res.data);
    //     len = res.data.length;
    //     return res.data;
    //   }
    // }
  });
};

function infoClicked() {
  if (!infoClicked.clicked) {
    aboutUs.style.display = "block";
    infoClicked.clicked = true;
  } else {
    aboutUs.style.display = "none";
    infoClicked.clicked = false;
  }
}

function closeAboutUs() {
  aboutUs.style.display = "none";
}
