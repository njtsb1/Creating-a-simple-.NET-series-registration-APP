using System;

namespace DIO.Series
{
    public class Serie : BaseEntity
    {
        // Atributos
		private Gender Gender { get; set; }
		private string Title { get; set; }
		private string Description { get; set; }
		private int Year { get; set; }
        private bool Deleted {get; set;}

        // Métodos
		public Serie(int id, Gender Gender, string Title, string Description, int Year)
		{
			this.Id = id;
			this.Gender = Gender;
			this.Title = Title;
			this.Description = Description;
			this.Year = Year;
            this.Deleted = false;
		}

        public override string ToString()
		{
			// Environment.NewLine https://docs.microsoft.com/en-us/dotnet/api/system.environment.newline?view=netcore-3.1
            string returns = "";
            returns += "Gender: " + this.Gender + Environment.NewLine;
            returns += "Title: " + this.Title + Environment.NewLine;
            returns += "Description: " + this.Description + Environment.NewLine;
            returns += "Starting year: " + this.Year + Environment.NewLine;
            returns += "Deleted: " + this.Deleted;
			return returns;
		}

        public string returnsTitle()
		{
			return this.Title;
		}

		public int returnId()
		{
			return this.Id;
		}
        public bool returnsDeleted()
		{
			return this.Deleted;
		}
        public void Delete() {
            this.Delete = true;
        }
    }
}