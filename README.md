SECTION: Cleaning and Manipulation

To clean the provided dataset, I used the open source tool OpenRefine (previously Google Refine.) I started by loading the csv file into refine,
instructing it to ignore the first 17 lines (text about the dataset, not data) and then treated the next row as column headers. 

Error 1: Misspellings

Fix 1: I applied a text facet to the GP_Type column. I then removed the rows to do with licensing at the end of the file. I then corrected
the presumed type of contactor to contractor. Since this changed 7 columns I assumed it was a mistake. With this facet applied, I also 
removed 8 matching rows that had a blank GP_Type since these refer to total rows that can be calculated programmatically. 

Error 2: Inconsistent Abbreviations

Fix 2: I applied a text facet to the Contract_Type column. I then altered GPMS and gpms to be General Practitioners Medical Services to improve
consistency. I also changed PMS to be Personal Medical Services. All of these abbreviations were found in:

https://catalogue.ic.nhs.uk/publications/primary-care/general-practice/gp-earn-expe-2009-2010/gp-earn-expe-2009-2010-rep.pdf

Fix 2.1: The countries in the original dataset were also inconsistent. I applied a text facet to the Country column and changed NI and 
Northern_Ireland both to Northern Ireland. 

Error 3: Misaligned Columns

Fix 3: I noticed that lots of the columns looked like they were misaligned, probably due to additional commas in the dataset. To correct this, I used
the Gender column as a base column to match up the data. I chose Gender as it was easy to stop which data should be in the column (Male || Female) and 
I could then shift the rows across accordingly so they matched up. 

I applied a text facet to the Gender column and selected all the rows that did not have a gender. These are the rows that are misaligned. I then looked
at the resulting rows, and stared each of the columns where the shift (i.e. 4 rows to the left) was the same. I then selected all the starred rows and 
began to move them across so the Gender matched up with where it should be. 

To move the data, I used GREL and applied the following formula to each misaligned column. 

cells["Column_with_correct_data_in"].value

This had the effect of moving one column to another column. I did this manually for all misaligned columns, since I could not find a way to shift columns
with refine. 

Error 4: Redundant £ characters in data

Fix 4: The Average Gross Earning From Employment column had redundant ¬£ characters at the start of the number that they represented. To remove these two
characters I applied the following GREL transformation:

value.slice(2)

Error 5: Numerical values being treated as strings

Fix 5: Some of the numerical values have commas in them, and some are wrapped in quote marks. To make these errors be treated as numbers, I applied the 
following GREL transformation to all numerical columns:

value.replace(',', '').toNumber()

Error 6: Total Rows

Fix 6: I wanted to remove the total rows that are littered through the dataset, since this can be calculated programmatically. To do this I applied
a text facet to the columns containing the word total, then used total as a filter to select only the total rows. I then removed the matching rows. 

Error 7: Missing calculable data

Fix 7: Some of the data that could be calculated from the data that is present, is missing. For instance, the Average_Total_Expenses_£ column contains
hyphens in some instances, but can be calculated from the columns around it. I applied the following transformation to populate the data:

cells[‘Average_Total_Income_Before_Tax_£’].value-cells[‘Average_Total_Gross_Earnings_£’].value

Additional fixes required when visualizing, not using refine: Removing _£ symbols from JSON KVP names and removing "-" where no data is present (and 
changing it to null). This has been done in Javascript as and when required.

A full JSON encoding of the transformations that I have made to the data can be found in the file: json_changes.json

SECTION: Visualisation Choice

Visualisation 1: The first visualisation is a donut chart that shows which sectors GPs spent their expenses on, when working self employed. It allows you 
to toggle between all the data and the data for just males and females. It tries to open up where GPs are spending expense money, and shows the difference 
between what males and females spend. 

Visualization 2: The second visualization is a scatter plot showing the amount of money GPs claim when working privately and for the NHS. It also shows the size
of the population and the gender of the GP. It aims to show if GPs claim more or less money when they work privately, if their gender affects this and if they
claim more if they are working within a larger practice. 

The blue circles represent data relating to males, and the pink circles females. The radius of the circles represent the Average_Population field, so the 
larger the circle, the more people that GP works with. 

SECTION: Implementation

I chose the D3JS library to complete the task, as it allows easy manipulation of the DOM and SVG elements. It also allows me to publish the data that I am working with in open format (JSON) and manipulate that data easily. D3 also allow me to easily add interactivity to the visualisations it can produce, giving
the end user a richer experience, allowing them to understand the data in great depth. 

Since D3 uses JavaScript, I was also able to clean and manipulate the data using standard JS. This was particularly helpful to remove - characters and skip over
null data. This enabled me to publish the entire data set, and use D3 and JS to manipulate it entirely.

SECTION: Conclusion

I am particularly proud of the results of the second visualization. If the data yielded no interesting output, I'd expect the chart to follow the line y = x, however
the data appears to be skewed towards the top left of the chart. This indicates that GPs claim more money as expenses when they are working self employed, compared to 
when they work for the NHS. This may potentially show waste in the private sector or a lack of money in the NHS.

