using System;

namespace DIO.Series
{
    class Program
    {
        static SerieRepository repository = new SerieRepository();
        static void Main(string[] args)
        {
            string Useroption = GetUseroption();

			while (Useroption.ToUpper() != "X")
			{
				switch (Useroption)
				{
					case "1":
						ListSeries();
						break;
					case "2":
						InsertSeries();
						break;
					case "3":
						UpdateSeries();
						break;
					case "4":
						ExcluirSerie();
						break;
					case "5":
						DeleteSeries();
						break;
					case "C":
						Console.Clear();
						break;

					default:
						throw new ArgumentOutOfRangeException();
				}

				Useroption = GetUseroption();
			}

			Console.WriteLine("Thank you for using our services..");
			Console.ReadLine();
        }

        private static void DeleteSeries()
		{
			Console.Write("Enter the series id: ");
			int indiceSerie = int.Parse(Console.ReadLine());

			repositorio.Excludes(indexSerie);
		}

        private static void PreviewSeries()
		{
			Console.Write("Enter the series id: ");
			int indiceSerie = int.Parse(Console.ReadLine());

			var serie = repository.ReturnById(indexSerie);

			Console.WriteLine(serie);
		}

        private static void UpdateSeries()
		{
			Console.Write("Enter the series id: ");
			int Indexseries = int.Parse(Console.ReadLine());

			// https://docs.microsoft.com/pt-br/dotnet/api/system.enum.getvalues?view=netcore-3.1
			// https://docs.microsoft.com/pt-br/dotnet/api/system.enum.getname?view=netcore-3.1
			foreach (int i in Enum.GetValues(typeof(Gender)))
			{
				Console.WriteLine("{0}-{1}", i, Enum.GetName(typeof(Gender), i));
			}
			Console.Write("Enter the gender between the options above.: ");
			int entryGenre = int.Parse(Console.ReadLine());

			Console.Write("Enter Series Title: ");
			string entryTitle = Console.ReadLine();

			Console.Write("Enter the Start Year of the Series: ");
			int entryYear = int.Parse(Console.ReadLine());

			Console.Write("Enter Series Description: ");
			string entryDescription = Console.ReadLine();

			Serie updatesseries = new Serie(id: Indexseries,
										gender: (Gender)entryGenre,
										title: entryTitle,
										year: entryYear,
										description: entryDescription);

			repository.Updates(Indexseries, updatesseries);
		}
        private static void ListSeries()
		{
			Console.WriteLine("List Series");

			var list = repository.List();

			if (list.Count == 0)
			{
				Console.WriteLine("No registered series.");
				return;
			}

			foreach (var serie in lista)
			{
                var deleted = serie.returnsDeleted();
                
				Console.WriteLine("#ID {0}: - {1} {2}", serie.returnId(), serie.returnsTitle(), (deleted ? "*deleted*" : ""));
			}
		}

        private static void InsertSeries()
		{
			Console.WriteLine("Insert new series");

			// https://docs.microsoft.com/pt-br/dotnet/api/system.enum.getvalues?view=netcore-3.1
			// https://docs.microsoft.com/pt-br/dotnet/api/system.enum.getname?view=netcore-3.1
			foreach (int i in Enum.GetValues(typeof(Gender)))
			{
				Console.WriteLine("{0}-{1}", i, Enum.GetName(typeof(Gender), i));
			}
			Console.Write("Enter the gender between the options above: ");
			int entryGenre = int.Parse(Console.ReadLine());

			Console.Write("Enter Series Title: ");
			string entryTitle = Console.ReadLine();

			Console.Write("Enter the Start Year of the Series: ");
			int entryYear = int.Parse(Console.ReadLine());

			Console.Write("Enter Series Description: ");
			string 	entryDescription = Console.ReadLine();

			Serie newSerie = new Serie(id: repositoy.NextId(),
										gender: (Gender)entryGenre,
										title: entryTitle,
										year: entryYear,
										description: entryDescription);

			repository.Insert(newSerie);
		}

        private static string GetUserOption()
		{
			Console.WriteLine();
			Console.WriteLine("DIO Series at your disposal!!!");
			Console.WriteLine("Enter the desired option:");

			Console.WriteLine("1- List series");
			Console.WriteLine("2- Insert new series");
			Console.WriteLine("3- Update serie");
			Console.WriteLine("4- Delete serie");
			Console.WriteLine("5- View serie");
			Console.WriteLine("C- Clear screen");
			Console.WriteLine("X- To go out");
			Console.WriteLine();

			string Useroption = Console.ReadLine().ToUpper();
			Console.WriteLine();
			return Useroption;
		}
    }
}
