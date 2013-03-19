SECTION: Cleaning and Manipulation

To clean the provided dataset, I used the open source tool OpenRefine (previously Google Refine.) I started by loading the csv file into refine,
instructing it to ignore the first 17 lines (text about the dataset, not data) and then treated the next row as column headers. 

Error 1: Misspellings

Fix 1: I applied a text facet to the GP_Type column. I then removed the rows to do with licensing at the end of the file. I then corrected
the presumed typo of contactor to contractor. Since this changed 7 columns I assumed it was a mistake. With this facet applied, I also 
removed 8 matching rows that had a blank GP_Type since these refer to total rows that can be calculated programatically. 

Error 2: Inconsistent Abbreviations

Fix 2: I applied a text facet to the Contract_Type column. I then altered GPMS and gpms to be General Practitioners Medical Services to improve
consistency. I also changed PMS to be Personal Medical Services. All of these abbreviations were found in:

https://catalogue.ic.nhs.uk/publications/primary-care/general-practice/gp-earn-expe-2009-2010/gp-earn-expe-2009-2010-rep.pdf

Fix 2.1: The countries in the original dataset were also inconsistent. I applied a text facet to the Country column and changed NI and 
Northern_Ireland both to Northern Ireland. 

Error 3: Misaligned Columns

Fix 3: 


Additional fixes required when visualizing, not using refine: Removing _£ symbols from JSON KVP names and removing "-" where no data is present (and 
changing it to null). This has been done in Javascript as and when required.

A full JSON encoding of the transformations that I have made to the data can be found in the file: 