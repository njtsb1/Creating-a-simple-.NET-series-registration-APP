// Classes/Serie.cs
using System;

namespace DIO.Series
{
    public class Serie : BaseEntity
    {
        // Attributes
        private Gender Gender { get; set; }
        private string Title { get; set; }
        private string Description { get; set; }
        private int Year { get; set; }
        private bool Deleted { get; set; }

        // Methods
        public Serie(int id, Gender gender, string title, string description, int year)
        {
            this.Id = id;
            this.Gender = gender;
            this.Title = title;
            this.Description = description;
            this.Year = year;
            this.Deleted = false;
        }

        public override string ToString()
        {
            string returns = "";
            returns += "Gender: " + this.Gender + Environment.NewLine;
            returns += "Title: " + this.Title + Environment.NewLine;
            returns += "Description: " + this.Description + Environment.NewLine;
            returns += "Starting year: " + this.Year + Environment.NewLine;
            returns += "Deleted: " + this.Deleted;
            return returns;
        }

        public string GetTitle()
        {
            return this.Title;
        }

        public int GetId()
        {
            return this.Id;
        }

        public bool IsDeleted()
        {
            return this.Deleted;
        }

        public void Delete()
        {
            this.Deleted = true;
        }
    }
}
